import * as yup from "yup";

export const portfolioStepSchema = yup.object({
  acceptRules: yup
    .mixed<true>()
    .oneOf([true], "پذیرش قوانین الزامی است.")
    .required("پذیرش قوانین الزامی است."),
});

export type PortfolioStepData = yup.InferType<typeof portfolioStepSchema>;
