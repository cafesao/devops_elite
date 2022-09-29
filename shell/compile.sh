# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Compile
cd ../Lambdas/Create && yarn compile && cd $ROOT_FOLDER
cd ../Lambdas/Read && yarn compile && cd $ROOT_FOLDER
cd ../Lambdas/Update && yarn compile && cd $ROOT_FOLDER
cd ../Lambdas/Delete && yarn compile && cd $ROOT_FOLDER
cd ../Lambdas/Layer && yarn compile && cd $ROOT_FOLDER
