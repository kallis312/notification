import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate()
  return (
    // <Flex bg="gray.100" align="center" w={'full'} p={4} justify="center" h="100vh">
    <Center h={'100vh'} p={2} flexDirection={'column'}>
      {/* <Box mb={2} p={4} color={'teal'} fontSize={32} bg={'teal.200'} rounded={'full'}>
        <HiLockClosed />
      </Box> */}
      <Formik
        initialValues={{
          userId: "",
          password: ""
        }}
        onSubmit={(values) => {
          navigate('/dashboard')
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack align="flex-start" >
              <FormControl isInvalid={!!errors.userId && touched.userId}>
                <FormLabel htmlFor="userId">UserId</FormLabel>
                <Field
                  size={'sm'}
                  as={Input}
                  id="userId"
                  name="userId"
                  type="userId"
                  validate={(value) => value.length < 3 ? "Password must contain at least 3 characters" : undefined}
                />
                {/* <FormErrorMessage>{errors.userId}</FormErrorMessage> */}
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  size={'sm'}
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  validate={(value) => value.length < 6 ? "Password must contain at least 6 characters" : undefined}
                />
                {/* <FormErrorMessage>{errors.password}</FormErrorMessage> */}
              </FormControl>
              <Button size={'sm'} type="submit" colorScheme="teal" width="full">
                Login
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Center>
    // </Flex>
  );
}

export default index