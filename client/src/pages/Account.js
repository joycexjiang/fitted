import React, { useEffect, useState } from "react";
import {
  Card,
  Flex,
  Box,
  Text,
  TextField,
  Dialog,
  Button,
} from "@radix-ui/themes";

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the stored user information
    }
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          user account details
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          {user ? (
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Name
                </Text>
                <TextField.Input
                  defaultValue={user.name}
                  placeholder="Enter your full name"
                  disabled={true}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Email
                </Text>
                <TextField.Input
                  defaultValue={user.email}
                  placeholder="Enter your email"
                  disabled={true}
                />
              </label>
            </Flex>
          ) : (
            <p>No user information available</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Account;
