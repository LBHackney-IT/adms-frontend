"use client"

import React from "react";
import Papa from "papaparse";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Upload} from "lucide-react";
import {Progress} from "@/components/ui/progress";
import {uploadTransactions} from "@/lib/transactionApiCalls";
import {TransactionCreate} from "@/types/transaction";

interface ParsedData {
    [key: string]: any;
}

export default function TransactionUpsert() {
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);
    const [jsonData, setJsonData] = React.useState<ParsedData[] | null>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileProcessing(file);
        }
    }

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files?.[0];
        if (file) {
            handleFileProcessing(file);
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    //Threw this to AI a few times
    const handleFileProcessing = (file: File) => {
        if (!file.name.toLowerCase().endsWith('.csv')) {
            setError('Please select a CSV file');
            return;
        }

        setIsUploading(true);
        setError(null);
        setFileName(file.name);
        setUploadProgress(0);

        // Collect rows as they're processed
        const collectedRows: ParsedData[] = [];

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false, // Changed to false for better control
            delimitersToGuess: [',', ';', '\t', '|'],
            transformHeader: (header: string) => {
                const transformed = header.trim()
                    .replace(/\s+/g, ' ')
                    .replace(/[^\w\s%]/g, '')
                    .trim();
                return transformed;
            },
            transform: (value: any, field: string | number) => {
                // Handle empty values
                if (value === null || value === undefined || value === '') {
                    return null;
                }

                if (typeof value === 'string') {
                    const trimmedValue = value.trim();

                    // If empty after trimming, return null
                    if (trimmedValue === '') {
                        return null;
                    }

                    // Define numeric fields based on your CSV structure
                    const numericFields = [
                        'Levy declared',
                        'English %',
                        '10% top up',
                        'Paid from levy',
                        'Your contribution',
                        'Government contribution',
                        'Total',
                        'Course level',
                        'Unique learner number' // ULN should be numeric
                    ];

                    if (typeof field === 'string' && numericFields.includes(field)) {
                        // Handle percentage values
                        if (field === 'English %') {
                            const numericValue = parseFloat(trimmedValue.replace(/[,%]/g, ''));
                            return isNaN(numericValue) ? null : numericValue;
                        }

                        // Handle other numeric values (including negative values)
                        const numericValue = parseFloat(trimmedValue.replace(/,/g, ''));
                        return isNaN(numericValue) ? null : numericValue;
                    }

                    // Handle date fields
                    const dateFields = ['Transaction date', 'Payroll month'];
                    if (typeof field === 'string' && dateFields.includes(field)) {
                        return trimmedValue;
                    }
                }

                return value;
            },
            step: (row: Papa.ParseStepResult<any>) => {
                // Collect each row as it's processed
                if (row.data && !row.errors.length) {
                    collectedRows.push(row.data);
                }

                // Update progress
                if (file.size > 0) {
                    const progress = Math.round((row.meta.cursor / file.size) * 100);
                    setUploadProgress(progress);
                }
            },
            complete: (results: Papa.ParseResult<ParsedData>) => {
                setIsUploading(false);
                setUploadProgress(100);

                // Handle parse errors
                if (results.errors.length > 0) {
                    const criticalErrors = results.errors.filter(error =>
                        error.type === 'Delimiter' || error.type === 'Quotes'
                    );
                    if (criticalErrors.length > 0) {
                        setError(`Parse error: ${criticalErrors[0].message}`);
                        return;
                    }
                    // Log non-critical errors but continue processing
                    console.warn('Non-critical parse errors:', results.errors);
                }

                // Filter and transform the collected rows
                const processedData = collectedRows
                    .filter(row => {
                        // More robust row filtering
                        return Object.values(row).some(value => {
                            if (value === null || value === undefined) return false;
                            if (typeof value === 'string') {
                                return value.trim().length > 0;
                            }
                            if (typeof value === 'number') {
                                return !isNaN(value);
                            }
                            return true;
                        });
                    })
                    .map(row => transformRowToTransaction(row));

                setJsonData(processedData);
                uploadTransactions(processedData);
            },
            error: (error: Error) => {
                setIsUploading(false);
                setError(`Error parsing CSV: ${error.message}`);
                console.error('Parse error:', error);
            }
        });
    };

// Helper function to transform CSV row to TransactionCreate interface
    const transformRowToTransaction = (row: ParsedData): TransactionCreate => {
        // Helper function to parse dates
        const parseDate = (dateStr: string | null): Date | null => {
            if (!dateStr || typeof dateStr !== 'string') return null;

            // Handle DD/MM/YYYY format (common in UK)
            const ukDateMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            if (ukDateMatch) {
                const [, day, month, year] = ukDateMatch;
                return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }

            // Handle other date formats
            const parsedDate = new Date(dateStr);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        };

        // Helper function to safely convert to number
        const toNumber = (value: any): number | null => {
            if (value === null || value === undefined || value === '') return null;
            if (typeof value === 'number') return value;
            if (typeof value === 'string') {
                const num = parseFloat(value.replace(/,/g, ''));
                return isNaN(num) ? null : num;
            }
            return null;
        };

        // Helper function to safely convert to string
        const toString = (value: any): string | null => {
            if (value === null || value === undefined || value === '') return null;
            return String(value).trim() || null;
        };

        return {
            description: toString(row['Description']) || '',
            transactionDate: parseDate(row['Transaction date']) || new Date(),
            transactionType: toString(row['Transaction type']) || '',
            courseLevel: toNumber(row['Course level']),
            englishPercentage: toNumber(row['English %']),
            governmentContribution: toNumber(row['Government contribution']),
            levyDeclared: toNumber(row['Levy declared']),
            paidFromLevy: toNumber(row['Paid from levy']),
            payrollMonth: parseDate(row['Payroll month']),
            tenPercentageTopUp: toNumber(row['10% top up']),
            total: toNumber(row['Total']),
            yourContribution: toNumber(row['Your contribution']),
            apprenticeName: toString(row['Apprentice']),
            apprenticeshipTrainingCourse: toString(row['Apprenticeship training course']),
            payeScheme: toString(row['PAYE scheme']),
            trainingProvider: toString(row['Training provider']),
            uln: toNumber(row['Unique learner number'])
        };
    };

    return(
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Transaction CSV File
                </CardTitle>
                <CardDescription>Upload a CSV file containing transaction data</CardDescription>
            </CardHeader>
            <CardContent>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#00b341] transition-colors cursor-pointer"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 hover:text-[#00b341]" />
                    <div className="mt-4">
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                                Drop transaction files here or click to upload
                            </span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept=".csv"
                                className="sr-only"
                                onChange={handleFileUpload}
                            />
                        </label>
                        <p className="mt-1 text-xs text-gray-500">CSV files up to 10MB</p>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {fileName && !error && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm text-blue-600">File: {fileName}</p>
                    </div>
                )}

                {isUploading && (
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Processing...</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="w-full" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}