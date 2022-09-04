import {
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

const TextField = ({ label, as, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormControl isInvalid={meta.error && meta.touched} {...props}>
            <FormLabel color='#C1C1C1'>{label}</FormLabel>
            <Field as={as} bg='#343434' border='none' borderRadius={'8px'} color='#C1C1C1' {...field} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default TextField;