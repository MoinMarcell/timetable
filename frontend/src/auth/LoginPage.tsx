import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import LoginForm from "./LoginForm.tsx";
import Typography from "@mui/material/Typography";

type LoginPageProps = {
    login: (username: string, password: string) => void,
    loading: boolean,
}

export default function LoginPage(props: LoginPageProps) {
    return (
        <Box>
            <Container sx={{
                display: "flex",
                mt: 2,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <Typography
                    variant={"h3"}
                    sx={{
                        mb: 2,
                        fontSize: "2rem",
                    }}
                >
                    Anmelden
                </Typography>
                <Typography paragraph>Bitte melde dich an, um die App nutzen zu können.</Typography>
                <LoginForm loading={props.loading} login={props.login}/>
            </Container>
        </Box>
    );
}