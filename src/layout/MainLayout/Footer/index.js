import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      "& .MuiGrid-root": {
        color: theme.themeOption.textSecondary,
      },
    },
    dot: {
      width: "5px",
      height: "5px",
      marginRight: theme.spacing(1),
      borderRadius: "50%",
      backgroundColor: "#7F77EC",
      "&.price": {
        marginTop: theme.spacing(2),
        marginRight: "-8px",
      },
    },
  };
});

export default function Footer() {
  const classes = useStyles();

  return 1234;
}
