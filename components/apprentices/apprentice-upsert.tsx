"use client"

import React from "react";
import Papa from "papaparse";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { uploadApprentices } from "@/lib/apprenticeApiCalls";
import { ApprenticeCreate } from "@/types/apprentice";

interface ParsedData {
    [key: string]: any;
}

export default function ApprenticeUpsert() {
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
    //Threw this to AI more then a few times
    const handleFileProcessing = (file: File) => {
        setFileName(file.name);
        setError(null);
        setIsUploading(true);
        setUploadProgress(0);

        if (!file.name.endsWith('.csv')) {
            setError('Please upload a valid CSV file');
            setIsUploading(false);
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            setError('File size exceeds 10MB limit');
            setIsUploading(false);
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (result) => {
                try {
                    const parsedData: ApprenticeCreate[] = result.data.map((row: any) => ({
                        name: row['Apprentice name'] || null,
                        startDate: new Date(row['Planned start date']),
                        status: row['Status'] || null, // Use the 'Status' column from CSV
                        uln: row['ULN'] ? Number(row['ULN']) : null,
                        dateOfBirth: row['Date of birth'] ? new Date(row['Date of birth']) : null,
                        apprenticeAchievement: null,
                        apprenticeConfirmation: row['Apprentice confirmation'] || null,
                        apprenticeClassification: null,
                        apprenticeEthnicity: null,
                        apprenticeGender: null,
                        apprenticeNonCompletionReason: null,
                        apprenticeProgram: null,
                        apprenticeProgression: null,
                        apprenticeshipDelivery: row['Apprenticeship delivery model'] || null,
                        certificatesReceived: null,
                        completionDate: null,
                        directorate: null,
                        doeReference: row['Reference'] || null,
                        employeeNumber: null,
                        endDate: row['Planned end date'] ? new Date(row['Planned end date']) : null,
                        endPointAssessor: null,
                        isCareLeaver: false,
                        isDisabled: false,
                        managerName: null,
                        managerTitle: null,
                        pauseDate: row['Paused date'] ? new Date(row['Paused date']) : null,
                        post: null,
                        school: row['Your reference'] || null,
                        totalAgreedApprenticeshipPrice: row['Total agreed apprenticeship price'] ?
                            Number(String(row['Total agreed apprenticeship price']).replace(/,/g, '')) : null,
                        trainingCourse: row['Apprenticeship training course'] || null,
                        trainingProvider: row['Training provider'] || null,
                        ukprn: null,
                        withdrawalDate: null
                    }));

                    // Validate that all records have a valid status
                    const invalidRecords = parsedData.filter((record, index) => !record.status);
                    if (invalidRecords.length > 0) {
                        throw new Error(
                            `Invalid or missing 'Status' in rows: ${invalidRecords
                                .map((_, index) => index)
                                .join(', ')}`
                        );
                    }

                    setJsonData(parsedData);
                    setUploadProgress(50);
                    console.log('Parsed data:', parsedData);
                    // Upload to API
                    await uploadApprentices(parsedData);
                    setUploadProgress(100);
                    setTimeout(() => {
                        setIsUploading(false);
                    }, 1000);
                } catch (err) {
                    setError('Error processing CSV file: ' + (err instanceof Error ? err.message : String(err)));
                    setIsUploading(false);
                }
            },
            error: (err) => {
                setError('Error parsing CSV file: ' + err.message);
                setIsUploading(false);
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Apprentice CSV File
                </CardTitle>
                <CardDescription>Upload a CSV file containing apprentice data</CardDescription>
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
                                Drop apprentice files here or click to upload
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