-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY', 'OTHER');

-- CreateEnum
CREATE TYPE "InvoiceStatusEnum" AS ENUM ('PENDING', 'PAID', 'CANCELED', 'OVERDUE', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentFrequencyEnum" AS ENUM ('MONTHLY', 'BIANNUAL', 'ANNUAL');

-- CreateEnum
CREATE TYPE "PlanPaymentMethodEnum" AS ENUM ('PIX', 'CREDIT_CARD', 'INVOICE');

-- CreateEnum
CREATE TYPE "BudgetStatusEnum" AS ENUM ('PENDENT', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'WAITING_PARTS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentMethodEnum" AS ENUM ('PIX_OFFLINE', 'PIX_ONLINE', 'CARD_DEBIT', 'CARD_CREDIT', 'CARD_LINK', 'MONEY', 'OTHER');

-- CreateEnum
CREATE TYPE "ReceiptEnum" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'FINANCIAL', 'OPERATOR');

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "month" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "biannual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "annual" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "max_users" INTEGER NOT NULL DEFAULT 0,
    "max_budgets_month" INTEGER NOT NULL DEFAULT 0,
    "max_devices" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fantasy" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address_in_line" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "public_place" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_settings" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "theme_color" TEXT NOT NULL DEFAULT '#000000',
    "mercado_pago_key" TEXT,
    "mercado_pago_token" TEXT,
    "mercado_pago_mode" TEXT NOT NULL DEFAULT 'TEST',
    "mercado_pago_email" TEXT,
    "pix_key" TEXT,
    "using_email" BOOLEAN NOT NULL DEFAULT false,
    "email_host" TEXT,
    "email_user" TEXT,
    "email_password" TEXT,
    "email_port" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "role" "RoleEnum" NOT NULL DEFAULT 'OPERATOR',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_companies" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "is_trial" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(3),
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "payment_frequency" "PaymentFrequencyEnum" NOT NULL DEFAULT 'MONTHLY',
    "due_date" INTEGER NOT NULL DEFAULT 15,
    "payment_method" "PlanPaymentMethodEnum" NOT NULL DEFAULT 'PIX',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "plan_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_invoices" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "due_date" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "external_id" TEXT,
    "external_meta" TEXT,
    "provider_name" TEXT,
    "payment_method" "PlanPaymentMethodEnum" NOT NULL DEFAULT 'PIX',
    "invoice_status" "InvoiceStatusEnum" NOT NULL DEFAULT 'PENDING',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "value" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_counters" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "budget" INTEGER NOT NULL DEFAULT 0,
    "service" INTEGER NOT NULL DEFAULT 0,
    "receipt" INTEGER NOT NULL DEFAULT 0,
    "user" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budget_counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "document" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "zip_code" TEXT NOT NULL DEFAULT '',
    "public_place" TEXT NOT NULL DEFAULT '',
    "number" TEXT NOT NULL DEFAULT '',
    "complement" TEXT NOT NULL DEFAULT '',
    "neighborhood" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "year" TEXT NOT NULL DEFAULT '',
    "km" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "total_value" DOUBLE PRECISION NOT NULL,
    "status" "BudgetStatusEnum" NOT NULL DEFAULT 'PENDENT',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_status_histories" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "status_old" "BudgetStatusEnum" NOT NULL DEFAULT 'PENDENT',
    "status" "BudgetStatusEnum" NOT NULL DEFAULT 'PENDENT',
    "user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budget_status_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_items" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "service_name" TEXT NOT NULL,
    "service_value" DOUBLE PRECISION NOT NULL,
    "suggest_value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reference_id" TEXT,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budget_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_payments" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "budget_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethodEnum" NOT NULL DEFAULT 'OTHER',
    "external_id" TEXT,
    "external_meta" TEXT,
    "for_customer" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "budget_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipts" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "budget_id" TEXT,
    "recipient_name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "receipt_type" "ReceiptEnum" NOT NULL DEFAULT 'IN',
    "value_extense" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reverse" BOOLEAN NOT NULL DEFAULT false,
    "payment_method" "PaymentMethodEnum" NOT NULL DEFAULT 'OTHER',
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "receipts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "managers_name_key" ON "managers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");

-- CreateIndex
CREATE INDEX "managers_id_email_cpf_phone_idx" ON "managers"("id", "email", "cpf", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- CreateIndex
CREATE INDEX "companies_id_cnpj_fantasy_email_phone_zip_code_hash_idx" ON "companies"("id", "cnpj", "fantasy", "email", "phone", "zip_code", "hash");

-- CreateIndex
CREATE INDEX "company_settings_id_company_id_idx" ON "company_settings"("id", "company_id");

-- CreateIndex
CREATE INDEX "users_id_company_id_username_email_code_idx" ON "users"("id", "company_id", "username", "email", "code");

-- CreateIndex
CREATE UNIQUE INDEX "users_company_id_code_key" ON "users"("company_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "users_company_id_username_key" ON "users"("company_id", "username");

-- CreateIndex
CREATE INDEX "plan_companies_id_company_id_plan_id_is_trial_expires_at_ex_idx" ON "plan_companies"("id", "company_id", "plan_id", "is_trial", "expires_at", "expired", "payment_frequency", "due_date", "payment_method");

-- CreateIndex
CREATE UNIQUE INDEX "plan_companies_company_id_plan_id_key" ON "plan_companies"("company_id", "plan_id");

-- CreateIndex
CREATE INDEX "company_invoices_company_id_plan_id_reference_external_id_p_idx" ON "company_invoices"("company_id", "plan_id", "reference", "external_id", "provider_name", "payment_method", "invoice_status");

-- CreateIndex
CREATE INDEX "services_id_company_id_code_name_description_value_active_c_idx" ON "services"("id", "company_id", "code", "name", "description", "value", "active", "created_at", "updated_at", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "services_company_id_code_key" ON "services"("company_id", "code");

-- AddForeignKey
ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_companies" ADD CONSTRAINT "plan_companies_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_companies" ADD CONSTRAINT "plan_companies_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_invoices" ADD CONSTRAINT "company_invoices_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_invoices" ADD CONSTRAINT "company_invoices_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_counters" ADD CONSTRAINT "budget_counters_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_status_histories" ADD CONSTRAINT "budget_status_histories_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_status_histories" ADD CONSTRAINT "budget_status_histories_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_status_histories" ADD CONSTRAINT "budget_status_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_reference_id_fkey" FOREIGN KEY ("reference_id") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_payments" ADD CONSTRAINT "budget_payments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_payments" ADD CONSTRAINT "budget_payments_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_payments" ADD CONSTRAINT "budget_payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
