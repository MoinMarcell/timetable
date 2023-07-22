import {FormEvent, useState} from "react";
import Box from "@mui/material/Box";
import {Container, TextField} from "@mui/material";
import Button from "@mui/material/Button";

type LoginPageProps = {
    login: (username: string, password: string) => void,
    loading: boolean,
}

export default function LoginForm(props: LoginPageProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.login(username, password);
    }

    return (
        <Box>
            <Container>
                <Box
                    component={"form"}
                    onSubmit={handleLogin}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        mt: 2,
                    }}
                >
                    <TextField value={username} onChange={e => setUsername(e.target.value)} label={"Username"}/>
                    <TextField type={"password"} value={password} onChange={e => setPassword(e.target.value)}
                               label={"Password"}/>
                    {
                        props.loading ?
                            <Button variant={"contained"} disabled>Logging in...</Button> :
                            <Button type={"submit"} variant={"contained"}>Login</Button>
                    }
                </Box>
            </Container>
        </Box>
    );
}