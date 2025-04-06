import { ScrollArea } from "./ui/scroll-area";

function ChatBox({ chat }) {
  return (
    <ScrollArea>
      <div className="flex flex-col space-y-4">
        {chat.map((message, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-shrink-0">
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.name} />
                <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {message.name}
              </p>
              <p className="text-sm text-gray-500">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default ChatBox;
