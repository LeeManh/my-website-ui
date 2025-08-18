import React from "react";
import { Card } from "antd";
import { MessageSquare } from "lucide-react";

export const CommentEmpty = () => {
  return (
    <Card>
      <div className="flex items-center justify-center gap-2 w-full p-4">
        <MessageSquare className="w-4 h-4 text-gray-500" />
        <span className="text-gray-500">There are no comments yet</span>
      </div>
    </Card>
  );
};
