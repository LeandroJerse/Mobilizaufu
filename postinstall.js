const { execSync } = require('child_process');

try {
  console.log('🔧 Gerando cliente Prisma...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente Prisma gerado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao gerar cliente Prisma:', error.message);
  process.exit(1);
}
