# Robot Control API Documentation

## Base URL
```
http://localhost:3001
```

## Common Response Format

모든 API 응답은 다음과 같은 공통 형식을 사용합니다:

```json
{
  "success": boolean,
  "data": any,
  "message"?: string,
  "total"?: number,
  "timestamp"?: string
}
```

## Data Models

### Robot Entity
```json
{
  "id": "string (UUID)",
  "name": "string",
  "type": "string",
  "ipAddress": "string (IP address)",
  "port": "number",
  "status": "online | offline | error",
  "description": "string (optional)",
  "lastSeen": "string (ISO date)",
  "capabilities": [
    {
      "name": "string",
      "type": "movement | sensor | camera | arm | gripper | custom",
      "enabled": "boolean",
      "parameters": "object (optional)"
    }
  ],
  "metadata": "object"
}
```

### Robot Capability
```json
{
  "name": "string",
  "type": "movement | sensor | camera | arm | gripper | custom",
  "enabled": "boolean",
  "parameters": {
    "key": "any value"
  }
}
```

---

## API Endpoints

### 1. Get All Robots
**GET** `/robots`

모든 로봇 목록을 조회합니다.

#### Query Parameters
- `type` (optional): 로봇 타입으로 필터링
- `status` (optional): 로봇 상태로 필터링 (`online`, `offline`, `error`)

#### Request Example
```bash
GET /robots
GET /robots?type=Industrial%20Arm
GET /robots?status=online
GET /robots?type=Mobile&status=online
```

#### Response Example
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Industrial Robot #1",
      "type": "Industrial Arm",
      "ipAddress": "192.168.1.100",
      "port": 8080,
      "status": "online",
      "description": "Main assembly line robot",
      "lastSeen": "2024-01-15T10:30:00.000Z",
      "capabilities": [
        {
          "name": "Movement",
          "type": "movement",
          "enabled": true,
          "parameters": {
            "maxSpeed": 100,
            "accuracy": 0.1
          }
        },
        {
          "name": "Camera",
          "type": "camera",
          "enabled": true,
          "parameters": {
            "resolution": "1920x1080",
            "fps": 30
          }
        }
      ],
      "metadata": {
        "manufacturer": "RoboCorp",
        "model": "RC-3000"
      }
    }
  ],
  "total": 1
}
```

---

### 2. Get Online Robots
**GET** `/robots/online`

온라인 상태의 로봇만 조회합니다.

#### Request Example
```bash
GET /robots/online
```

#### Response Example
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Industrial Robot #1",
      "type": "Industrial Arm",
      "ipAddress": "192.168.1.100",
      "port": 8080,
      "status": "online",
      "description": "Main assembly line robot",
      "lastSeen": "2024-01-15T10:30:00.000Z",
      "capabilities": [],
      "metadata": {}
    }
  ],
  "total": 1
}
```

---

### 3. Get Robot by ID
**GET** `/robots/:id`

특정 로봇의 상세 정보를 조회합니다.

#### Path Parameters
- `id`: 로봇 ID (UUID)

#### Request Example
```bash
GET /robots/550e8400-e29b-41d4-a716-446655440000
```

#### Response Example
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Industrial Robot #1",
    "type": "Industrial Arm",
    "ipAddress": "192.168.1.100",
    "port": 8080,
    "status": "online",
    "description": "Main assembly line robot",
    "lastSeen": "2024-01-15T10:30:00.000Z",
    "capabilities": [
      {
        "name": "Movement",
        "type": "movement",
        "enabled": true,
        "parameters": {
          "maxSpeed": 100,
          "accuracy": 0.1
        }
      }
    ],
    "metadata": {
      "manufacturer": "RoboCorp",
      "model": "RC-3000"
    }
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Robot with ID 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

### 4. Create Robot
**POST** `/robots`

새로운 로봇을 생성합니다. ID는 서버에서 자동 생성됩니다.

#### Request Body
```json
{
  "name": "string (required)",
  "type": "string (required)",
  "ipAddress": "string (required, IP format)",
  "port": "number (required)",
  "description": "string (optional)",
  "capabilities": [
    {
      "name": "string",
      "type": "movement | sensor | camera | arm | gripper | custom",
      "enabled": "boolean",
      "parameters": "object (optional)"
    }
  ],
  "metadata": "object (optional)"
}
```

#### Request Example
```json
{
  "name": "New Industrial Robot",
  "type": "Industrial Arm",
  "ipAddress": "192.168.1.150",
  "port": 8080,
  "description": "Secondary assembly line robot",
  "capabilities": [
    {
      "name": "Welding",
      "type": "arm",
      "enabled": true,
      "parameters": {
        "weldType": "TIG",
        "maxCurrent": 200
      }
    },
    {
      "name": "Vision System",
      "type": "camera",
      "enabled": true,
      "parameters": {
        "resolution": "4K",
        "frameRate": 60
      }
    }
  ],
  "metadata": {
    "manufacturer": "IndustryBot",
    "model": "IB-5000",
    "serialNumber": "IB5000-2024-001"
  }
}
```

#### Response Example (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "New Industrial Robot",
    "type": "Industrial Arm",
    "ipAddress": "192.168.1.150",
    "port": 8080,
    "status": "offline",
    "description": "Secondary assembly line robot",
    "lastSeen": "2024-01-15T11:00:00.000Z",
    "capabilities": [
      {
        "name": "Welding",
        "type": "arm",
        "enabled": true,
        "parameters": {
          "weldType": "TIG",
          "maxCurrent": 200
        }
      },
      {
        "name": "Vision System",
        "type": "camera",
        "enabled": true,
        "parameters": {
          "resolution": "4K",
          "frameRate": 60
        }
      }
    ],
    "metadata": {
      "manufacturer": "IndustryBot",
      "model": "IB-5000",
      "serialNumber": "IB5000-2024-001"
    }
  },
  "message": "Robot created successfully"
}
```

---

### 5. Update Robot
**PATCH** `/robots/:id`

기존 로봇의 정보를 부분 업데이트합니다.

#### Path Parameters
- `id`: 로봇 ID (UUID)

#### Request Body
모든 필드는 선택사항이며, 제공된 필드만 업데이트됩니다.

```json
{
  "name": "string (optional)",
  "type": "string (optional)",
  "ipAddress": "string (optional)",
  "port": "number (optional)",
  "description": "string (optional)",
  "capabilities": "array (optional)",
  "metadata": "object (optional)"
}
```

#### Request Example
```json
{
  "name": "Updated Robot Name",
  "description": "Updated description",
  "capabilities": [
    {
      "name": "Enhanced Movement",
      "type": "movement",
      "enabled": true,
      "parameters": {
        "maxSpeed": 150,
        "accuracy": 0.05
      }
    }
  ]
}
```

#### Response Example
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Updated Robot Name",
    "type": "Industrial Arm",
    "ipAddress": "192.168.1.100",
    "port": 8080,
    "status": "online",
    "description": "Updated description",
    "lastSeen": "2024-01-15T11:15:00.000Z",
    "capabilities": [
      {
        "name": "Enhanced Movement",
        "type": "movement",
        "enabled": true,
        "parameters": {
          "maxSpeed": 150,
          "accuracy": 0.05
        }
      }
    ],
    "metadata": {
      "manufacturer": "RoboCorp",
      "model": "RC-3000"
    }
  },
  "message": "Robot updated successfully"
}
```

---

### 6. Update Robot Status
**PUT** `/robots/:id/status`

로봇의 상태만 업데이트합니다.

#### Path Parameters
- `id`: 로봇 ID (UUID)

#### Request Body
```json
{
  "status": "online | offline | error"
}
```

#### Request Example
```json
{
  "status": "online"
}
```

#### Response Example
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Industrial Robot #1",
    "type": "Industrial Arm",
    "ipAddress": "192.168.1.100",
    "port": 8080,
    "status": "online",
    "description": "Main assembly line robot",
    "lastSeen": "2024-01-15T11:20:00.000Z",
    "capabilities": [],
    "metadata": {}
  },
  "message": "Robot status updated successfully"
}
```

---

### 7. Delete Robot
**DELETE** `/robots/:id`

로봇을 삭제합니다.

#### Path Parameters
- `id`: 로봇 ID (UUID)

#### Request Example
```bash
DELETE /robots/550e8400-e29b-41d4-a716-446655440000
```

#### Response Example
```json
{
  "success": true,
  "message": "Robot deleted successfully"
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Robot with ID 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

---

### 8. Get Robot Health
**GET** `/robots/:id/health`

로봇의 상태 점검 정보를 조회합니다.

#### Path Parameters
- `id`: 로봇 ID (UUID)

#### Request Example
```bash
GET /robots/550e8400-e29b-41d4-a716-446655440000/health
```

#### Response Example
```json
{
  "success": true,
  "data": {
    "robotId": "550e8400-e29b-41d4-a716-446655440000",
    "healthy": true,
    "status": "online",
    "lastSeen": "2024-01-15T11:25:00.000Z",
    "uptime": 45000
  }
}
```

#### Health Check Logic
- `healthy`: `true` if status is 'online' and lastSeen is within 60 seconds
- `uptime`: Time in milliseconds since lastSeen (0 if not healthy)

---

## HTTP Status Codes

- **200 OK**: 성공적인 요청
- **201 Created**: 리소스 생성 성공
- **400 Bad Request**: 잘못된 요청 (validation 실패)
- **404 Not Found**: 리소스를 찾을 수 없음
- **500 Internal Server Error**: 서버 내부 오류

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (optional)"
}
```

### Validation Error Example
```json
{
  "success": false,
  "message": "Validation failed",
  "error": [
    {
      "field": "name",
      "message": "name should not be empty"
    },
    {
      "field": "ipAddress",
      "message": "ipAddress must be a valid IP address"
    }
  ]
}
```

---

## Usage Examples

### cURL Examples

#### Create a new robot
```bash
curl -X POST http://localhost:3001/robots \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Robot",
    "type": "Mobile Base",
    "ipAddress": "192.168.1.200",
    "port": 8080,
    "description": "Test robot for development"
  }'
```

#### Get all online robots
```bash
curl http://localhost:3001/robots/online
```

#### Update robot status
```bash
curl -X PUT http://localhost:3001/robots/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -d '{"status": "online"}'
```

#### Delete a robot
```bash
curl -X DELETE http://localhost:3001/robots/550e8400-e29b-41d4-a716-446655440000
```

### JavaScript Fetch Examples

#### Create a robot
```javascript
const response = await fetch('http://localhost:3001/robots', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'JavaScript Robot',
    type: 'Service Robot',
    ipAddress: '192.168.1.250',
    port: 8080,
    capabilities: [
      {
        name: 'API Control',
        type: 'custom',
        enabled: true,
        parameters: {
          apiVersion: '1.0',
          protocol: 'HTTP'
        }
      }
    ]
  })
});

const robot = await response.json();
console.log('Created robot:', robot);
```

#### Get robot details
```javascript
const response = await fetch(`http://localhost:3001/robots/${robotId}`);
const robotData = await response.json();

if (robotData.success) {
  console.log('Robot details:', robotData.data);
} else {
  console.error('Error:', robotData.message);
}
```