import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { copyHtmlWithStyle } from "@/utils/copy-html";
import { toast } from "sonner";

interface CopyButtonGroupProps {
  fullWidth?: boolean;
}

export const CopyButtonGroup: React.FC<CopyButtonGroupProps> = ({ fullWidth }) => {
  const handleCopyButtonClick = () => {
    copyHtmlWithStyle("markdown-body");
    toast.success("内容已复制", {
      description: "你可以粘贴到你的邮件中",
      duration: 4000,
      position: "top-center",
    });
  };

  return (
    <ButtonGroup>
      <Button
        className={fullWidth ? "w-full" : ""}
        onClick={handleCopyButtonClick}
      >
        复制
      </Button>
    </ButtonGroup>
  );
}; 