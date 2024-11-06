import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { toast } from "sonner";

interface DownloadButtonGroupProps {
  fullWidth?: boolean;
}

export const DownloadButtonGroup: React.FC<DownloadButtonGroupProps> = ({ fullWidth }) => {
  const handleDownloadButtonClick = async () => {
    const element = document.getElementById("markdown-body");
    if (!element) return;

    toast.success("处理中，请稍等...", {
      duration: 4000,
      position: "top-center",
    });

    // TODO: 实现图片下载功能
  };

  return (
    <ButtonGroup>
      <Button
        className={fullWidth ? "w-full" : ""}
        onClick={handleDownloadButtonClick}
      >
        下载
      </Button>
    </ButtonGroup>
  );
}; 