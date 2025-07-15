import type { AuditLogStatus, EventType } from "@/types/enums"

export interface AuditLog {
  details: any
  eventType: EventType
  eventTypeTargetId: string
  id: string
  status: AuditLogStatus
  createdAt: Date
  userId?: string
}
