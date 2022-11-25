import React from "react";
import { Button, CardActions, Stack, TextField } from "@mui/material";
import { Field, Form as FinalForm } from "react-final-form";

const Form = ({
  data,
  onSubmit,
  readonly,
}: {
  data?: any;
  onSubmit: (values: any[]) => void;
  readonly?: boolean;
}) => {
  const emailRegexp = /^\S+@\S+\.\S+$/;

  const required = (value: any) => (value ? undefined : "Required");
  const isEmail = (value: any) =>
    emailRegexp.test(value) ? undefined : "Must be an email address";

  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={data}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              paddingTop: "16px",
            }}
            spacing={2}
          >
            <Field name="id" component="input" validate={required}>
              {({ input, meta: { touched, invalid, error } }) => (
                <TextField
                  {...input}
                  label="ID"
                  name={"id"}
                  size="small"
                  required
                  error={touched && error}
                  helperText={touched && error}
                />
              )}
            </Field>
            <Field name="firstname" component="input">
              {({ input, meta: { touched, invalid, error } }) => (
                <TextField
                  {...input}
                  label="First name"
                  name={"firstname"}
                  size="small"
                />
              )}
            </Field>
            <Field name="lastname" component="input">
              {({ input, meta: { touched, invalid, error } }) => (
                <TextField
                  {...input}
                  label="Last name"
                  name={"lastname"}
                  size="small"
                />
              )}
            </Field>
            <Field
              name="email"
              component="input"
              type={"email"}
              validate={isEmail}
            >
              {({ input, meta: { touched, invalid, error } }) => (
                <TextField
                  {...input}
                  label="E-mail"
                  name={"email"}
                  size="small"
                  error={touched && error}
                  helperText={touched && error}
                />
              )}
            </Field>
          </Stack>
          <CardActions>
            {readonly ? null : (
              <Button
                type={"submit"}
                variant={"contained"}
                size={"small"}
                disableElevation
                disabled={invalid}
              >
                Submit
              </Button>
            )}
          </CardActions>
        </form>
      )}
    ></FinalForm>
  );
};

export default Form;
