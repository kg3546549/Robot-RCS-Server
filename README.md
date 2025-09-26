# Robot Management Server

React.js + TypeScript + Chakra UI로 구성된 로봇 제어 페이지의 백엔드 API 서버입니다. Nest.js 프레임워크를 사용하여 로봇 메타데이터를 관리하고 RESTful API를 제공합니다.

## 🏗️ 프로젝트 구조

```
server-app/
├── src/
│   ├── common/
│   │   └── interceptors/
│   │       └── response.interceptor.ts    # API 응답 표준화 인터셉터
│   ├── robots/
│   │   ├── dto/
│   │   │   ├── create-robot.dto.ts        # 로봇 생성 DTO
│   │   │   └── update-robot.dto.ts        # 로봇 업데이트 DTO
│   │   ├── entities/
│   │   │   └── robot.entity.ts            # 로봇 엔티티 정의
│   │   ├── robots.controller.ts           # 로봇 API 컨트롤러
│   │   ├── robots.module.ts               # 로봇 모듈
│   │   └── robots.service.ts              # 로봇 비즈니스 로직
│   ├── app.module.ts                      # 애플리케이션 루트 모듈
│   └── main.ts                            # 애플리케이션 진입점
├── nest-cli.json                          # Nest CLI 설정
├── package.json                           # 프로젝트 의존성
├── tsconfig.json                          # TypeScript 설정
└── README.md
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
cd server-app
npm install
```

### 2. 개발 서버 실행
```bash
npm run start:dev
```

서버는 `http://localhost:3001`에서 실행됩니다.

### 3. 프로덕션 빌드 및 실행
```bash
npm run build
npm run start:prod
```

## 📋 구현된 기능

### ✅ 완료된 작업

1. **기본 서버 구조 설정**
   - Nest.js 프로젝트 초기화
   - TypeScript 설정
   - 프로젝트 디렉토리 구조 생성

2. **로봇 메타데이터 관리**
   - 로봇 엔티티 정의 (ID, 이름, 타입, IP주소, 포트, 상태 등)
   - 로봇 능력(Capability) 시스템 구현
   - **MongoDB 데이터베이스 연동** (영구 데이터 저장)

3. **RESTful API 엔드포인트**
   - 로봇 CRUD 작업 (생성, 조회, 수정, 삭제)
   - 로봇 상태 관리
   - 필터링 및 검색 기능

4. **TypeScript 타입 시스템**
   - 강타입 엔티티 및 DTO
   - Class-validator를 통한 유효성 검증
   - API 응답 표준화

5. **CORS 설정**
   - 프론트엔드 애플리케이션과의 통신을 위한 CORS 활성화
   - 로컬 개발 환경 지원 (포트 3000, 5173)

## 🌐 API 엔드포인트
### [API Docs](https://github.com/kg3546549/Robot-RCS-Server/blob/master/readme.api.md)
### 기본 로봇 관리

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/robots` | 모든 로봇 조회 |
| `GET` | `/robots?type={type}` | 타입별 로봇 조회 |
| `GET` | `/robots?status={status}` | 상태별 로봇 조회 |
| `GET` | `/robots/online` | 온라인 로봇만 조회 |
| `GET` | `/robots/{id}` | 특정 로봇 조회 |
| `POST` | `/robots` | 새 로봇 등록 |
| `PATCH` | `/robots/{id}` | 로봇 정보 업데이트 |
| `PUT` | `/robots/{id}/status` | 로봇 상태 업데이트 |
| `DELETE` | `/robots/{id}` | 로봇 삭제 |
| `GET` | `/robots/{id}/health` | 로봇 상태 확인 |

### API 응답 형식
```json
{
  "success": true,
  "data": {...},
  "message": "optional message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🤖 로봇 데이터 구조

```typescript
interface Robot {
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

interface RobotCapability {
  name: string;
  type: 'movement' | 'sensor' | 'camera' | 'arm' | 'gripper' | 'custom';
  enabled: boolean;
  parameters?: Record<string, any>;
}
```

## 🔄 시스템 아키텍처

```
Frontend (React + TS + Chakra UI)
    ↓ HTTP API 호출
Backend (Nest.js API Server) ← 현재 구현된 부분
    ↓ 로봇 메타데이터 제공
Frontend가 로봇 메타데이터를 받아서 화면에 로봇 리스트 표시
    ↓ 사용자가 로봇 선택
Frontend에서 선택된 로봇으로 직접 WebSocket 연결
```

## 📦 사용된 주요 라이브러리

- **@nestjs/core**: Nest.js 핵심 프레임워크
- **@nestjs/common**: 공통 데코레이터 및 유틸리티
- **@nestjs/platform-express**: Express 플랫폼 어댑터
- **@nestjs/mongoose**: MongoDB Mongoose 연동
- **mongoose**: MongoDB ODM (Object Document Mapper)
- **class-validator**: DTO 유효성 검증
- **class-transformer**: 객체 변환
- **uuid**: 고유 ID 생성
- **rxjs**: 반응형 프로그래밍

## 🎯 추천 RESTful API 확장 기능

다음은 현재 구조에서 쉽게 확장 가능한 RESTful API 기능들입니다:

### 1. 로봇 그룹 관리
```
POST   /robot-groups              # 로봇 그룹 생성
GET    /robot-groups              # 그룹 목록 조회
GET    /robot-groups/{id}/robots  # 그룹 내 로봇 조회
PUT    /robot-groups/{id}/robots  # 그룹에 로봇 추가/제거
```

### 2. 로봇 작업(Task) 관리
```
POST   /robots/{id}/tasks         # 로봇에 작업 할당
GET    /robots/{id}/tasks         # 로봇 작업 조회
PUT    /robots/{id}/tasks/{taskId}/status  # 작업 상태 업데이트
GET    /tasks                     # 전체 작업 조회
```

### 3. 로봇 로그 및 이벤트
```
GET    /robots/{id}/logs          # 로봇 로그 조회
POST   /robots/{id}/events        # 로봇 이벤트 기록
GET    /events                    # 전체 이벤트 조회
```

### 4. 로봇 설정 관리
```
GET    /robots/{id}/config        # 로봇 설정 조회
PUT    /robots/{id}/config        # 로봇 설정 업데이트
POST   /robots/{id}/config/backup # 설정 백업
POST   /robots/{id}/config/restore # 설정 복원
```

### 5. 통계 및 모니터링
```
GET    /statistics/robots         # 로봇 통계
GET    /statistics/uptime         # 가동률 통계
GET    /health                    # 시스템 전체 상태
GET    /metrics                   # 시스템 메트릭
```

### 6. 사용자 및 권한 관리
```
POST   /auth/login               # 사용자 로그인
GET    /users                    # 사용자 목록
POST   /users                    # 사용자 생성
PUT    /users/{id}/permissions   # 권한 설정
```

### 7. 로봇 펌웨어 관리
```
GET    /robots/{id}/firmware     # 펌웨어 정보 조회
POST   /robots/{id}/firmware/update # 펌웨어 업데이트
GET    /firmware/versions        # 사용 가능한 펌웨어 버전
```

## 🔧 개발 도구

### 사용 가능한 npm 스크립트
- `npm run start:dev`: 개발 모드로 서버 실행 (핫 리로드)
- `npm run build`: 프로덕션 빌드
- `npm run start:prod`: 프로덕션 모드로 서버 실행
- `npm run lint`: 코드 린팅
- `npm run test`: 테스트 실행

## 🌟 다음 단계 권장사항

1. ~~**데이터베이스 연동**: 현재 인메모리 데이터를 실제 데이터베이스(PostgreSQL, MySQL)로 변경~~ ✅ **완료 - MongoDB 연동됨**
2. **WebSocket 게이트웨이**: 실시간 로봇 상태 업데이트를 위한 WebSocket 서버 추가
3. **인증/권한**: JWT 기반 사용자 인증 시스템 구현
4. **로깅 시스템**: 체계적인 로그 관리 및 모니터링 도구 추가
5. **Docker화**: 컨테이너 기반 배포를 위한 Dockerfile 작성
6. **API 문서화**: Swagger/OpenAPI를 통한 자동 API 문서 생성

## 💾 MongoDB 설정

### 로컬 MongoDB 실행
```bash
# MongoDB 설치 후 실행
mongod

# 또는 Docker로 실행
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 데이터베이스 정보
- **연결 URL**: `mongodb://localhost:27017/robot-management`
- **데이터베이스명**: `robot-management`
- **컬렉션명**: `robots`
- **샘플 데이터**: 서버 첫 실행시 자동 생성

### 데이터 구조
```javascript
// MongoDB 문서 예시
{
  "_id": ObjectId("..."),
  "id": "1",
  "name": "Industrial Robot #1",
  "type": "Industrial Arm",
  "ipAddress": "192.168.1.100",
  "port": 8080,
  "status": "online",
  "description": "Main assembly line robot",
  "lastSeen": ISODate("2025-09-26T04:32:27.933Z"),
  "capabilities": [
    {
      "name": "Movement",
      "type": "movement",
      "enabled": true,
      "parameters": { "maxSpeed": 100, "accuracy": 0.1 }
    }
  ],
  "metadata": { "manufacturer": "RoboCorp", "model": "RC-3000" },
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

이 서버는 프론트엔드에서 로봇 목록을 가져오는 용도로 설계되었으며, 실제 로봇 제어는 프론트엔드에서 직접 로봇과 WebSocket 등을 통해 통신하는 구조입니다.