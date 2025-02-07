# API Documentation

## Authentication

### Register a New User
**Endpoint:** `POST /api/auth/register`
**Description:** Registers a new user (tenant or landlord).
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "tenant" | "landlord"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token"
}
```

### User Login
**Endpoint:** `POST /api/auth/login`
**Description:** Authenticates a user and returns a JWT token.
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token"
}
```

---
## Maintenance Requests

### Create a Maintenance Request
**Endpoint:** `POST /api/maintenance`
**Description:** Allows a tenant to create a maintenance request.
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Request Body:**
```json
{
  "property": "string",
  "issueType": "string",
  "description": "string",
  "urgency": "low" | "medium" | "high"
}
```
**Response:**
```json
{
  "message": "Maintenance request created successfully"
}
```

### Get Maintenance Requests
**Endpoint:** `GET /api/maintenance`
**Description:** Retrieves maintenance requests for the logged-in user.

### Update Maintenance Request Status (Landlord Only)
**Endpoint:** `PUT /api/maintenance/:requestId/status`
**Description:** Allows a landlord to update the status of a maintenance request.
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Request Body:**
```json
{
  "status": "pending" | "in-progress" | "resolved"
}
```
**Response:**
```json
{
  "message": "Maintenance status updated successfully"
}
```

---
## Property Management

### Create a Property (Landlord Only)
**Endpoint:** `POST /api/properties`
**Description:** Allows landlords to create a new property.
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Request Body:**
```json
{
  "name": "string",
  "address": "string",
  "rentAmount": "number"
}
```
**Response:**
```json
{
  "message": "Property created successfully"
}
```

### Get Properties for the Logged-in User
**Endpoint:** `GET /api/properties`
**Description:** Retrieves properties associated with the logged-in landlord.

### Add a Tenant to a Property
**Endpoint:** `PUT /api/properties/:propertyId/tenant`
**Description:** Allows landlords to assign a tenant to a property.
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Request Body:**
```json
{
  "tenantId": "string"
}
```
**Response:**
```json
{
  "message": "Tenant added successfully"
}
```

### Update Rent for a Property
**Endpoint:** `PUT /api/properties/:propertyId/rent`
**Description:** Allows landlords to update the rent amount for a property.
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Request Body:**
```json
{
  "rentAmount": "number"
}
```
**Response:**
```json
{
  "message": "Rent amount updated successfully"
}
```

---
## Rent Management

### Get Rent Dues
**Endpoint:** `GET /api/rent`
**Description:** Retrieves pending rent dues for the logged-in user.

### Mark Rent as Paid (Tenant Only)
**Endpoint:** `PUT /api/rent/:rentDueId/paid`
**Description:** Allows tenants to mark a rent payment as completed.
**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```
**Response:**
```json
{
  "message": "Rent marked as paid successfully"
}
```

---
## User Management

### Get User Profile
**Endpoint:** `GET /api/users/profile`
**Description:** Retrieves the profile information of the logged-in user.

### Get All Tenants (Landlord Only)
**Endpoint:** `GET /api/users/tenants`
**Description:** Retrieves a list of all tenants managed by the landlord.

---
## Notes
- All endpoints (except `register` and `login`) require authentication.
- The `Authorization` header must contain a valid JWT token.
- Role-based access control applies for landlord-only and tenant-only actions.

