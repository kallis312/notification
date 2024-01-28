import { Button, Center, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { Field, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

const index = (): React.ReactNode => {
  const navigate = useNavigate()
  const onSubmit = async (value): Promise<void> => {
    try {
      const { data } = await axios.get('/noti-login', {
        params: value
      })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Center h={'100vh'} p={2} flexDirection={'column'}>
      <Formik
        initialValues={{
          userId: '',
          password: ''
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack align="flex-start">
              <FormControl isInvalid={!!errors.userId && touched.userId}>
                <FormLabel htmlFor="userId">UserId</FormLabel>
                <Field
                  size={'sm'}
                  as={Input}
                  id="userId"
                  name="userId"
                  type="userId"
                  validate={(value) =>
                    value.length < 3 ? 'Password must contain at least 3 characters' : undefined
                  }
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
                  validate={(value) =>
                    value.length < 6 ? 'Password must contain at least 6 characters' : undefined
                  }
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
  )
}

export default index
