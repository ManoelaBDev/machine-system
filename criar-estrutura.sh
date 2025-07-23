#!/bin/bash

PROJECT_NAME="machine-front"

npx create-next-app@latest $PROJECT_NAME

cd $PROJECT_NAME || exit

mkdir -p src/{components/Machine,features/machines/{api,hooks,pages},pages/machines/{new,[id]},schemas,styles,utils}

touch src/components/Machine/{MachineForm.tsx,MachineTable.tsx,MachineRow.tsx}

touch src/features/machines/api/{machineService.ts,types.ts}
touch src/features/machines/hooks/{useMachines.ts,useCreateMachine.ts,useUpdateMachine.ts}
touch src/features/machines/pages/{List.tsx,Form.tsx}

touch src/pages/machines/{page.tsx}
touch src/pages/machines/new/page.tsx
touch src/pages/machines/[id]/edit.tsx


touch src/schemas/machineSchema.ts

mkdir -p src/app
touch src/app/layout.tsx

echo "Estrutura Next.js criada com sucesso em '$PROJECT_NAME'"
