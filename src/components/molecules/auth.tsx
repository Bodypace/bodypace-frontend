"use client";

import React from "react";
import TextInput from "../atoms/text-input";
import Button from "../atoms/button";
import Link from "../atoms/link";
import Icon from "../icon";
import Checkbox from "../atoms/checkbox";

export interface ErrorDetails {
  username: boolean;
  password: boolean;
  message: string;
}

const noError: ErrorDetails = {
  username: false,
  password: false,
  message: "",
};

export interface AuthProps {
  register?: boolean;
  onSubmit: (
    username: string,
    password: string,
  ) => Promise<ErrorDetails | void>;
}

export default function Auth({ register = false, onSubmit }: AuthProps) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [checkedTerms, setCheckedTerms] = React.useState(false);
  const [checkedPrivacy, setCheckedPrivacy] = React.useState(false);
  const [error, setError] = React.useState(noError);
  const loading = React.useRef(false);

  const clearError = () => error.message && setError(noError);

  const handleSubmit = () => {
    if (loading.current) return;

    // prettier-ignore
    const localError =
      !username && !password ?
        { username: true,  password: true,  message: "Username and password are required" } :
      !username ?
        { username: true,  password: false, message: "Username is required" } :
      !password ?
        { username: false, password: true,  message: "Password is required" } :
      (register && password !== passwordRepeat) ?
        { username: false, password: true,  message: "Passwords do not match" } :
      (register && (!checkedTerms || !checkedPrivacy)) ?
        { username: false, password: false, message: "Agreement to below terms is required" } :
        { username: false, password: false, message: "" };

    if (localError.message) {
      setError(localError);
    } else {
      loading.current = true;
      onSubmit(username, password)
        .then((topLevelError) => {
          if (topLevelError && topLevelError.message) {
            setError(topLevelError);
          }
        })
        .finally(() => {
          loading.current = false;
        });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-lg pb-xl">
        <p className="flex flex-col font-technical p-md rounded-rounded bg-color-warning max-w-md">
          <em className="not-italic font-bold">this is FREE BETA version!</em>
          For demonstration purposes only, with no uptime and data retention
          guarantees. Your account and all your data will be deleted without
          notice sooner or later.
        </p>
        <TextInput
          type="text"
          placeholder="username"
          value={username}
          onChange={(v) => {
            clearError();
            setUsername(v);
          }}
          error={error.username}
        />
        <TextInput
          type="password"
          placeholder="password"
          value={password}
          onChange={(v) => {
            clearError();
            setPassword(v);
          }}
          error={error.password}
        />
        {register && (
          <TextInput
            type="password"
            placeholder="repeat password"
            value={passwordRepeat}
            onChange={(v) => {
              clearError();
              setPasswordRepeat(v);
            }}
            error={error.password}
          />
        )}
        {error.message && <ErrorMessage text={error.message} />}
        {register && (
          <Row>
            <Checkbox
              labelledBy="toc"
              checked={checkedTerms}
              onChange={(v: boolean) => {
                clearError();
                setCheckedTerms(v);
              }}
            />
            <label id="toc" className="font-clean text-md text-color-primary">
              I accept{" "}
              <a
                className="underline hover:no-underline"
                href="/terms-and-conditions/website"
              >
                Terms and Conditions
              </a>
            </label>
          </Row>
        )}
        {register && (
          <Row>
            <Checkbox
              labelledBy="privacy"
              checked={checkedPrivacy}
              onChange={(v: boolean) => {
                clearError();
                setCheckedPrivacy(v);
              }}
            />
            <label
              id="privacy"
              className="font-clean text-md text-color-primary"
            >
              I accept{" "}
              <a
                className="underline hover:no-underline"
                href="/privacy-policy/website"
              >
                Privacy Policy
              </a>
            </label>
          </Row>
        )}
        <Button
          text={register ? "Register" : "Login"}
          onClick={handleSubmit}
          wide
        />
      </div>
      <Link
        text={
          register
            ? "Already registered? Click here to login"
            : "Don't have an account yet? Click here to register"
        }
        href={register ? "/account/login" : "/account/register"}
      />
    </div>
  );
}

function ErrorMessage({ text }: { text: string }) {
  return (
    <Row>
      <Icon name="fa-triangle-exclamation-solid" elevated />
      <span className="max-w-[390px] font-clean text-md text-color-silenced">
        {text}
      </span>
    </Row>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-sm pl-lg">{children}</div>;
}
