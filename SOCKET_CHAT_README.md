# Socket Chat Implementation with Sender/Receiver Differentiation

This implementation provides a complete chat system with proper sender and receiver differentiation for both frontend and backend.

## Frontend Implementation

### Key Features

1. **Message Structure**: Enhanced `MessagePayload` type with sender/receiver information
2. **User Selection**: Dropdown to select chat recipient
3. **Message Display**: Different styling for sent vs received messages
4. **Real-time Updates**: Socket.IO integration for instant messaging
5. **Connection Status**: Visual indicators for connection state

### Message Structure

```typescript
type MessagePayload = {
  message: string;
  data: string;
  senderId: number;
  receiverId: number;
  senderName?: string;
  receiverName?: string;
  timestamp?: string;
  messageId?: string;
};
```

### Socket Events

- **Emit**: `newMessageChat` - Send message with sender/receiver info
- **Listen**: `onNewMessageChat-${userId}` - Receive messages for specific user

### UI Components

1. **Header**: Shows current user ID and connection status
2. **Recipient Selection**: Dropdown to choose who to chat with
3. **Message Area**: Chat bubbles with sender/receiver differentiation
4. **Input Area**: Message input with send button

## Backend Implementation

### Socket.IO Server Features

1. **User Management**: Track active users and their socket connections
2. **Message Routing**: Route messages to specific users based on receiver ID
3. **Room Management**: Join users to specific rooms for targeted messaging
4. **Error Handling**: Proper error handling and validation
5. **Additional Features**: Typing indicators, read receipts, offline message handling

### Key Socket Events

#### Server-side Events

- `join`: User joins chat system
- `newMessageChat`: Handle incoming messages
- `typing`: Handle typing indicators
- `messageRead`: Handle read receipts
- `disconnect`: Handle user disconnection

#### Client-side Events Emitted

- `connected`: Confirm user connection
- `onNewMessageChat-${userId}`: Deliver message to specific user
- `messageSent`: Confirm message delivery
- `userOffline`: Notify sender if receiver is offline
- `userTyping`: Broadcast typing status
- `messageReadReceipt`: Confirm message read

### Database Integration

The backend example includes placeholder functions for:

- `saveMessageToDatabase()`: Store messages
- `storeOfflineMessage()`: Queue messages for offline users

## Usage Instructions

### Frontend Setup

1. The chat component is already integrated in `/src/modules/socket/components/section-01.tsx`
2. Access it via `/socket` route
3. Select a recipient from the dropdown
4. Type and send messages

### Backend Setup

1. Install dependencies:

   ```bash
   npm install express socket.io cors
   ```

2. Run the server:

   ```bash
   node backend-socket-example.js
   ```

3. Server runs on port 3001 by default

### Configuration

Update the socket URL in `/src/contexts/WebsocketContext.tsx`:

```typescript
export const WEBSOCKET_URL = "http://localhost:3001"; // Your backend URL
```

## Message Flow

1. **User Selection**: User selects recipient from dropdown
2. **Message Input**: User types message and clicks send
3. **Frontend Processing**: Message is formatted with sender/receiver info
4. **Socket Emission**: Message sent via `newMessageChat` event
5. **Backend Processing**: Server validates and routes message
6. **Message Delivery**: Message sent to receiver's room
7. **UI Update**: Both sender and receiver see the message

## Security Considerations

1. **Authentication**: Implement user authentication before allowing chat access
2. **Authorization**: Verify users can only send messages to authorized recipients
3. **Input Validation**: Sanitize message content on both frontend and backend
4. **Rate Limiting**: Implement rate limiting to prevent spam
5. **Message Encryption**: Consider end-to-end encryption for sensitive conversations

## Extensions

### Possible Enhancements

1. **Group Chats**: Extend to support multiple recipients
2. **File Sharing**: Add support for file attachments
3. **Message History**: Implement message persistence and retrieval
4. **Push Notifications**: Add mobile push notifications
5. **Message Search**: Implement search functionality
6. **Emoji Reactions**: Add emoji reactions to messages
7. **Message Threading**: Support for reply threads

### Database Schema Example

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message_id VARCHAR(255) UNIQUE,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  sender_name VARCHAR(255),
  receiver_name VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255),
  last_seen TIMESTAMP,
  is_online BOOLEAN DEFAULT FALSE
);
```

## Testing

### Manual Testing

1. Open two browser windows/tabs
2. Navigate to `/socket` in both
3. Select different users in each tab
4. Send messages between them
5. Verify messages appear correctly with proper styling

### Automated Testing

Consider adding tests for:

- Socket connection handling
- Message sending/receiving
- User state management
- Error handling scenarios

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check backend server is running and CORS is configured
2. **Messages Not Appearing**: Verify user IDs match between sender and receiver
3. **TypeScript Errors**: Ensure all required fields are provided in message objects
4. **Socket Disconnections**: Implement reconnection logic for production use

### Debug Tips

1. Check browser console for socket connection logs
2. Monitor backend console for message routing logs
3. Use browser dev tools to inspect socket events
4. Verify user IDs are consistent across frontend and backend
