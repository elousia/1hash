import { toast } from "react-hot-toast";

export const successToast = (text: string) => {
  toast.success(text, {
    style: {
      border: "1px solid #44444480",
      padding: "8px",
      color: "#52525b",
      background: "#dadada",
      fontSize: "13px",
    },
    iconTheme: {
      primary: "#52525b",
      secondary: "#FFFAEE",
    },
  });
};

export const errorToast = (text: string) => {
  toast.error(text, {
    style: {
      border: "1px solid #ef4444",
      padding: "8px",
      color: "#dc2626",
      fontSize: "13px",
    },
    iconTheme: {
      primary: "#dc2626",
      secondary: "#fff",
    },
  });
};
