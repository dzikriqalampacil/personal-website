import React, { useRef, useEffect } from "react";
import {
  Flex,
  HStack,
  VStack,
  Text,
  Box,
  Link,
  FormControl,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import emailjs from "@emailjs/browser";

function ItemContact({ image, text, link }) {
  return (
    <HStack pl={{ base: "5%", lg: "22%" }}>
      <Link
        href={link}
        style={{ textDecoration: "none" }}
        isExternal
        _hover={{ transform: "scale(1.2)" }}
        aria-label={text}
      >
        <Icon icon={image} color="white" width={"26.25px"} height="26.25px" />
      </Link>
      <Text color="white" fontSize="16px">
        {text}
      </Text>
    </HStack>
  );
}

function Contact() {
  const toast = useToast();
  const form = useRef();

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const sendEmail = async (values, actions) => {
    try {
      if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error("Public key is not configured properly");
      }
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
        throw new Error("Service ID is not configured properly");
      }
      if (!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        throw new Error("Template ID is not configured properly");
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
        }
      );

      toast({
        title: "Message sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      actions.resetForm();
    } catch (error) {
      toast({
        title: "Failed to send message.",
        description: error.message || "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justify={"center"}
      align="center"
      minH="100vh"
      bg="#161616"
      py={{ base: "10%", md: "0" }}
      id="contact"
    >
      <Flex
        w="80%"
        borderRadius={"33px"}
        spacing={0}
        flexDirection={{ base: "column", md: "row" }}
      >
        <VStack
          borderRadius={{ base: "33px 33px 0px 0px", md: "33px 0px 0px 33px" }}
          bg="#272727"
          w={{ base: "full", md: "40%" }}
          alignItems={"flex-start"}
          justifyContent="center"
          p={{ base: "5%", md: "0" }}
        >
          <HStack
            pl={{ base: "5%", lg: "22%" }}
            mb={{ base: "10px", md: "40px" }}
            w="full"
          >
            <Text
              color="white"
              fontWeight={600}
              fontSize={{ base: "21px", md: "26px" }}
            >
              CONTACT
            </Text>
            <Box bg="white" height={"3px"} width="100%" />
          </HStack>
          <VStack
            spacing={"25px"}
            align="flex-start"
            pb={{ base: "40px", md: "90px" }}
            w="full"
          >
            <ItemContact
              image={"fluent:call-12-regular"}
              text={"087855474426"}
              link={"https://wa.me/6287855474426"}
            />
            <ItemContact
              image={"carbon:email"}
              text={"dzikri.qalam01@ui.ac.id"}
              link={
                "https://mail.google.com/mail/?view=cm&source=mailto&to=dzikri.qalam01@ui.ac.id"
              }
            />
            <ItemContact
              image={"akar-icons:location"}
              text={"Depok, Jawa Barat, Indonesia"}
              link={"https://goo.gl/maps/6xLP3NgaUKH1wWj39"}
            />
          </VStack>
          <Box bg="white" height={"3px"} width="40%" alignSelf="flex-start" />
        </VStack>
        <FormControl
          w={{ base: "full", md: "60%" }}
          p={{ base: "5%", md: "50" }}
          bg="#202020"
          borderRadius={{ base: "0px 0px 33px 33px", md: "0px 33px 33px 0px" }}
        >
          <VStack align="flex-start" w="full" spacing="30px">
            <Formik
              initialValues={{ name: "", email: "", subject: "", message: "" }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                email: Yup.string()
                  .email("Invalid Email")
                  .required("Email is required"),
                subject: Yup.string().required("Subject is required"),
                message: Yup.string().required("Message is required"),
              })}
              onSubmit={sendEmail}
            >
              {(formik) => (
                <VStack
                  as="form"
                  ref={form}
                  align="flex-start"
                  w="full"
                  spacing="30px"
                  onSubmit={formik.handleSubmit}
                >
                  <Flex
                    justify={"space-between"}
                    w="full"
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <TextField name="name" label={"Your Name"} as={Input} />
                    <TextField
                      name="email"
                      type="email"
                      label={"Your Email"}
                      as={Input}
                      ml={{ base: "0", sm: "5%" }}
                      mt={{ base: "30px", sm: "0" }}
                    />
                  </Flex>
                  <TextField name="subject" label={"Your Subject"} as={Input} />
                  <TextField
                    name="message"
                    label={"Your Message"}
                    as={Textarea}
                  />
                  <Button
                    type="submit"
                    bg="brand.green"
                    borderRadius={"10px"}
                    padding={"6px 28px"}
                    cursor={"pointer"}
                    alignSelf="flex-end"
                    _hover={{
                      boxShadow: "0px 0px 11px #13FF00",
                    }}
                  >
                    <Icon
                      icon={"bx:mail-send"}
                      color="black"
                      width={"26.25px"}
                      height="26.25px"
                    />
                    <Text
                      color="brand.black"
                      fontWeight={"600"}
                      ml={3}
                      fontSize="15px"
                    >
                      Send
                    </Text>
                  </Button>
                </VStack>
              )}
            </Formik>
          </VStack>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default Contact;
