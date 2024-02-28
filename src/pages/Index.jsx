import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, useToast, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaThermometerHalf } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [temperature, setTemperature] = useState("");
  const [lastTemperature, setLastTemperature] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-bnrm.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        toast({
          title: "Login successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-bnrm.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Signup successful.",
          description: "You can now login.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Signup failed.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStoreTemperature = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backengine-bnrm.fly.dev/temperature?temperature=${temperature}`, {
        method: "POST",
      });

      if (response.ok) {
        setTemperature("");
        toast({
          title: "Temperature stored successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Storing temperature failed.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGetLastTemperature = async () => {
    try {
      const response = await fetch("https://backengine-bnrm.fly.dev/last_temperature", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setLastTemperature(data);
      } else {
        throw new Error("Fetching last temperature failed.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <Heading mb={6}>TempApp</Heading>
      {!isAuthenticated ? (
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Login
          </Button>
          <Button leftIcon={<FaUserPlus />} onClick={handleSignup}>
            Signup
          </Button>
        </Stack>
      ) : (
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Temperature</FormLabel>
            <Input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaThermometerHalf />} onClick={handleStoreTemperature}>
            Submit Temperature
          </Button>
          <Button onClick={handleGetLastTemperature}>Get Last Temperature</Button>
          {lastTemperature && (
            <Box>
              <Text>Last Temperature: {lastTemperature}</Text>
            </Box>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Index;
