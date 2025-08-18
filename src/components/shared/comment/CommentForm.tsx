"use client";

import React from "react";
import { Avatar, Button, Card } from "antd";
import { Editor } from "../editor/Editor";
import { Send } from "lucide-react";

export const CommentForm = () => {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <Avatar
          src="https://images.unsplash.com/photo-1490650034439-fd184c3c86a5?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          size="large"
        />

        <Editor />
      </div>

      <div className="flex justify-end mt-4">
        <Button className="flex items-center" type="primary" htmlType="submit">
          <Send className="w-4 h-4" />
          <span>Comment</span>
        </Button>
      </div>
    </Card>
  );
};
