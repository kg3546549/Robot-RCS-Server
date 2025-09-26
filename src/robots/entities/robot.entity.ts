export interface Robot {
  id: string;
  name: string;
  type: string;
  ipAddress: string;
  port: number;
  status: 'online' | 'offline' | 'error';
  description?: string;
  lastSeen: Date;
  capabilities: RobotCapability[];
  metadata: Record<string, any>;
}

export interface RobotCapability {
  name: string;
  type: 'movement' | 'sensor' | 'camera' | 'arm' | 'gripper' | 'custom';
  enabled: boolean;
  parameters?: Record<string, any>;
}