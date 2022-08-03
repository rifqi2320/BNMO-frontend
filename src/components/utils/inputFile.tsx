import { Button, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

const InputFile = ({ onChange, accept, ...props }: any) => {
  const ref = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files) {
      if (onChange) {
        onChange(e);
      }
      // Truncate file name if it's too long
      const file = e.target.files[0];
      const fileName =
        file.name.length > 15 ? `${file.name.slice(0, 15)}...` : file.name;
      setFileName(fileName);
    }
  };

  return (
    <>
      <Input
        accept={accept}
        type="file"
        onChange={handleChange}
        ref={ref}
        display="none"
      />
      <Button onClick={handleClick} {...props}>
        <Text>{fileName ? fileName : "Choose a file"}</Text>
      </Button>
    </>
  );
};

export default InputFile;
