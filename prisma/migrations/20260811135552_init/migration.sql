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

-- CreateTable
CREATE TABLE "managers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

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
    "maxUsers" INTEGER NOT NULL DEFAULT 0,
    "maxBudgetsMonth" INTEGER NOT NULL DEFAULT 0,
    "maxDevices" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

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
    "addressInLine" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "publicPlace" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_settings" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "themeColor" TEXT NOT NULL DEFAULT '#000000',
    "mercadoPagoKey" TEXT,
    "mercadoPagoToken" TEXT,
    "mercadoPagoMode" TEXT NOT NULL DEFAULT 'TEST',
    "mercadoPagoEmail" TEXT,
    "pixKey" TEXT,
    "usingEMAIL" BOOLEAN NOT NULL DEFAULT false,
    "emailHost" TEXT,
    "emailUser" TEXT,
    "emailPassword" TEXT,
    "emailPort" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_companies" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "isTrial" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "paymentFrequency" "PaymentFrequencyEnum" NOT NULL DEFAULT 'MONTHLY',
    "dueDate" INTEGER NOT NULL DEFAULT 15,
    "paymentMethod" "PlanPaymentMethodEnum" NOT NULL DEFAULT 'PIX',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "plan_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_invoices" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "externalId" TEXT,
    "externalMeta" TEXT,
    "providerName" TEXT,
    "paymentMethod" "PlanPaymentMethodEnum" NOT NULL DEFAULT 'PIX',
    "invoiceStatus" "InvoiceStatusEnum" NOT NULL DEFAULT 'PENDING',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "company_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "value" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_counters" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "budget" INTEGER NOT NULL DEFAULT 0,
    "service" INTEGER NOT NULL DEFAULT 0,
    "receipt" INTEGER NOT NULL DEFAULT 0,
    "user" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "budget_counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "customerName" TEXT NOT NULL,
    "document" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "zipCode" TEXT NOT NULL DEFAULT '',
    "publicPlace" TEXT NOT NULL DEFAULT '',
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
    "totalValue" DOUBLE PRECISION NOT NULL,
    "status" "BudgetStatusEnum" NOT NULL DEFAULT 'PENDENT',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_status_histories" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "statusOld" "BudgetStatusEnum" NOT NULL DEFAULT 'PENDENT',
    "status" "BudgetStatusEnum" NOT NULL DEFAULT 'PENDENT',
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "budget_status_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_items" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceValue" DOUBLE PRECISION NOT NULL,
    "suggestValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "referenceId" TEXT,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "budget_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetPayment" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethodEnum" NOT NULL DEFAULT 'OTHER',
    "externalId" TEXT,
    "externalMeta" TEXT,
    "forCustomer" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BudgetPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipts" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "budgetId" TEXT,
    "recipientName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "receiptType" "ReceiptEnum" NOT NULL DEFAULT 'IN',
    "valueExtense" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reverse" BOOLEAN NOT NULL DEFAULT false,
    "paymentMethod" "PaymentMethodEnum" NOT NULL DEFAULT 'OTHER',
    "value" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receipts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "managers_name_key" ON "managers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_companies" ADD CONSTRAINT "plan_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_companies" ADD CONSTRAINT "plan_companies_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_invoices" ADD CONSTRAINT "company_invoices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_invoices" ADD CONSTRAINT "company_invoices_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_counters" ADD CONSTRAINT "budget_counters_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_status_histories" ADD CONSTRAINT "budget_status_histories_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_status_histories" ADD CONSTRAINT "budget_status_histories_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_status_histories" ADD CONSTRAINT "budget_status_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetPayment" ADD CONSTRAINT "BudgetPayment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetPayment" ADD CONSTRAINT "BudgetPayment_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetPayment" ADD CONSTRAINT "BudgetPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
