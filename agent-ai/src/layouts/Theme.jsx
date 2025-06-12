import { Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { styled } from "@/lib/stitches";

const Box = styled("div", {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    color: "$text",
    "&:hover": {
        backgroundColor: 'white',
    },
});

export default function Theme({ children }) {
  return (
    <RadixTheme
      appearance="dark"
      accentColor="indigo"
      scaling="100%"
      radius="full"
    >
                {children}
      <Box>

      </Box>
    </RadixTheme>
  );
}