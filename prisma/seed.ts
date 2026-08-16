import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

// Configura o adapter de PG para o Prisma
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

// Inicializa o cliente do Prisma com o adapter configurado
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando semeação do banco de dados...');

  // 1. Criar o Gerente Administrador inicial
  const adminEmail = 'jssolucoeseservicos+smartcar@gmail.com';
  const existingAdmin = await prisma.manager.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Criptografa a senha padrão 'admin123'
    const hashedPassword = await bcrypt.hash('522576', 12);

    const admin = await prisma.manager.create({
      data: {
        name: 'JS Soluções e Serviços',
        cpf: '84005017053',
        phone: '51982488374',
        email: adminEmail,
        password: hashedPassword,
        active: true,
      },
    });

    console.log(`Gerente Administrador criado com sucesso: ${admin.email}`);
  } else {
    console.log('Gerente Administrador já cadastrado.');
  }

  // 2. Criar alguns planos padrões iniciais (opcional, mas recomendado para o sistema)
  const defaultPlans = [
    {
      id: 'cmsq853020000fuvuih6u871m',
      name: 'Plano Bronze',
      description: 'Plano básico para pequenas oficinas',
      month: 99.9,
      biannual: 539.4,
      annual: 959.0,
      maxUsers: 3,
      maxBudgetsMonth: 50,
      maxDevices: 1,
    },
    {
      id: 'cmsq853040000fuvuk45c516h',
      name: 'Plano Prata',
      description: 'Plano intermediário para oficinas em crescimento',
      month: 199.9,
      biannual: 1079.4,
      annual: 1919.0,
      maxUsers: 10,
      maxBudgetsMonth: 200,
      maxDevices: 3,
    },
    {
      id: 'cmsq853060000fuvun38ucl38',
      name: 'Plano Ouro',
      description: 'Plano completo com recursos ilimitados',
      month: 349.9,
      biannual: 1889.4,
      annual: 3359.0,
      maxUsers: 999,
      maxBudgetsMonth: 9999,
      maxDevices: 10,
    },
    {
      id: 'cmsq853080000fuvuh92t6t2m',
      name: 'Perpetum Basic',
      description: 'Plano perpetuo básico',
      month: 59.99,
      biannual: 0,
      annual: 0,
      maxUsers: 2,
      maxBudgetsMonth: 0,
      maxDevices: 2,
    },
  ];

  for (const plan of defaultPlans) {
    const existingPlan = await prisma.plan.findUnique({
      where: { name: plan.name },
    });

    if (!existingPlan) {
      const createdPlan = await prisma.plan.create({
        data: plan,
      });
      console.log(`Plano criado com sucesso: ${createdPlan.name}`);
    } else {
      console.log(`Plano ${plan.name} já cadastrado.`);
    }
  }

  // 3. Criar Empresa Inicial (DL Chapeação e Pintura)
  const companyCnpj = '66925976000183';
  const existingCompany = await prisma.company.findFirst({
    where: { cnpj: companyCnpj },
  });

  let companyId = '';
  if (!existingCompany) {
    const company = await prisma.company.create({
      data: {
        id: 'cmsq86ffq0000fuuuig4krung',
        name: 'DL CHAPEAÇÃO E PINTURA',
        fantasy: 'DL Chapeação e Pintura',
        cnpj: companyCnpj,
        ie: 'ISENTO',
        phone: '51983099462',
        email: 'contato@dlchapeacao.com.br',
        addressInLine: 'Rua Vereador Porto, 717 - Partenon, Porto Alegre/RS',
        zipCode: '90680130',
        publicPlace: 'Rua Vereador Porto',
        number: '717',
        complement: '',
        neighborhood: 'Partenon',
        city: 'Porto Alegre',
        state: 'RS',
        logo: '',
        hash: '7f072709-7e53-4efd-927e-fbf2b65a0e02',
        active: true,
      },
    });
    companyId = company.id;
    console.log(`Empresa inicial criada com sucesso: ${company.name}`);

    // Vincula a empresa a um plano padrão (ex: Perpetum Basic)
    const plan = await prisma.plan.findUnique({
      where: { name: 'Perpetum Basic' },
    });
    if (plan) {
      await prisma.planCompany.create({
        data: {
          companyId: 'cmsq86ffq0000fuuuig4krung',
          planId: 'cmsq853080000fuvuh92t6t2m',
          isTrial: false,
          expired: false,
          active: true,
        },
      });
    }
  } else {
    companyId = existingCompany.id;
    console.log('Empresa inicial já cadastrada.');
  }

  // 4. Criar Usuário Inicial
  const existingUser = await prisma.user.findFirst({
    where: { companyId, username: 'admin' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('123456', 12);
    const user = await prisma.user.create({
      data: {
        companyId,
        code: 1,
        name: 'Denilson de Lima',
        email: 'admin@dlchapeacao.com.br',
        username: 'admin',
        role: 'ADMIN',
        password: hashedPassword,
        active: true,
      },
    });
    console.log(`Usuário inicial 'ADMIN' criado com sucesso para a empresa.`);
  } else {
    console.log('Usuário inicial já cadastrado.');
  }

  console.log('Semeação concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Desconecta o cliente do Prisma
    await prisma.$disconnect();
  });
