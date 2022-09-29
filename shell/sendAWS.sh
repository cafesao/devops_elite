# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

# Install depedencies
sh ./installAllDep.sh

# Compile
sh ./compile.sh

# Zip Lambdas
cd ../Lambdas/Create && cd ./dist/Create && zip -q -r ../../lambda.zip ./ && echo "Success Create" && cd $ROOT_FOLDER
cd ../Lambdas/Read && cd ./dist/Read && zip -q -r ../../lambda.zip ./ && echo "Success Read" && cd $ROOT_FOLDER
cd ../Lambdas/Update && cd ./dist/Update && zip -q -r ../../lambda.zip ./ && echo "Success Update" && cd $ROOT_FOLDER
cd ../Lambdas/Delete && cd ./dist/Delete && zip -q -r ../../lambda.zip ./ && echo "Success Delete" && cd $ROOT_FOLDER

# Remove node_modules and install dependencies (prod)
cd ../Lambdas/Create && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd ../Lambdas/Read && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd ../Lambdas/Update && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd ../Lambdas/Delete && rm -r node_modules && yarn --production && cd $ROOT_FOLDER
cd ../Lambdas/Layer && rm -r node_modules && yarn --production && cd $ROOT_FOLDER

# Create folder nodejs and copy node_modules
cd ../Lambdas/Create && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd ../Lambdas/Read && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd ../Lambdas/Update && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER
cd ../Lambdas/Delete && mkdir nodejs && mv node_modules ./nodejs || true && cd $ROOT_FOLDER

# Zip nodejs
cd ../Lambdas/Create && zip -q -r ./lib.zip ./nodejs && echo "Success Create" && cd $ROOT_FOLDER
cd ../Lambdas/Read && zip -q -r ./lib.zip ./nodejs && echo "Success Read" && cd $ROOT_FOLDER
cd ../Lambdas/Update && zip -q -r ./lib.zip ./nodejs && echo "Success Update" && cd $ROOT_FOLDER
cd ../Lambdas/Delete && zip -q -r ./lib.zip ./nodejs && echo "Success Delete" && cd $ROOT_FOLDER

# Move folder to nodejs Layer Helper
cd ../Lambdas/Layer && mkdir nodejs && mv ./dist/* ./nodejs && mv ./node_modules ./nodejs || true && cd $ROOT_FOLDER

# Zip Layer Helper
cd ../Lambdas/Layer && zip -q -r ./lib.zip ./nodejs && echo "Success Create" && cd $ROOT_FOLDER

# Sync S3 Lambda
echo 'Sync S3'
export S3_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name audio-s3 --query "Stacks[].Outputs[?OutputKey=='S3BucketLambdaName'].OutputValue" --profile pessoal --no-cli-pager --output text)
aws s3 cp ../Lambdas/Create/lambda.zip s3://${S3_NAME}/Create/lambda.zip --profile pessoal
aws s3 cp ../Lambdas/Read/lambda.zip s3://${S3_NAME}/Read/lambda.zip --profile pessoal
aws s3 cp ../Lambdas/Update/lambda.zip s3://${S3_NAME}/Update/lambda.zip --profile pessoal
aws s3 cp ../Lambdas/Delete/lambda.zip s3://${S3_NAME}/Delete/lambda.zip --profile pessoal

# Sync S3 Lib
aws s3 cp ../Lambdas/Create/lib.zip s3://${S3_NAME}/Create/lib.zip --profile pessoal
aws s3 cp ../Lambdas/Read/lib.zip s3://${S3_NAME}/Read/lib.zip --profile pessoal
aws s3 cp ../Lambdas/Update/lib.zip s3://${S3_NAME}/Update/lib.zip --profile pessoal
aws s3 cp ../Lambdas/Delete/lib.zip s3://${S3_NAME}/Delete/lib.zip --profile pessoal

# Sync S3 Layer Helper
aws s3 cp ../Lambdas/Layer/lib.zip s3://${S3_NAME}/Layer/lib.zip --profile pessoal

# Get Name Lambda
export LAMBDA_FUNCTION_CREATE_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name audio-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameCreate'].OutputValue" --profile pessoal --no-cli-pager --output text)
export LAMBDA_FUNCTION_READ_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name audio-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameRead'].OutputValue" --profile pessoal --no-cli-pager --output text)
export LAMBDA_FUNCTION_UPDATE_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name audio-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameUpdate'].OutputValue" --profile pessoal --no-cli-pager --output text)
export LAMBDA_FUNCTION_DELETE_NAME=$(aws --region us-east-1 cloudformation describe-stacks --stack-name audio-lambda --query "Stacks[].Outputs[?OutputKey=='LambdaNameDelete'].OutputValue" --profile pessoal --no-cli-pager --output text)

#Update Code Lambda
echo 'Update Code'
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_CREATE_NAME} --s3-bucket ${S3_NAME} --s3-key Create/lambda.zip --profile pessoal --no-cli-pager || true
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_READ_NAME} --s3-bucket ${S3_NAME} --s3-key Read/lambda.zip --profile pessoal --no-cli-pager || true
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_UPDATE_NAME} --s3-bucket ${S3_NAME} --s3-key Update/lambda.zip --profile pessoal --no-cli-pager || true
aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_DELETE_NAME} --s3-bucket ${S3_NAME} --s3-key Delete/lambda.zip --profile pessoal --no-cli-pager || true

# Update Lib
echo 'Create Layer'
export LAYER_CREATE=$(aws lambda publish-layer-version --layer-name audio-layer-create --content S3Bucket=${S3_NAME},S3Key=Create/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_READ=$(aws lambda publish-layer-version --layer-name audio-layer-read --content S3Bucket=${S3_NAME},S3Key=Read/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_UPDATE=$(aws lambda publish-layer-version --layer-name audio-layer-update --content S3Bucket=${S3_NAME},S3Key=Update/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_DELETE=$(aws lambda publish-layer-version --layer-name audio-layer-delete --content S3Bucket=${S3_NAME},S3Key=Delete/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)
export LAYER_HELPER=$(aws lambda publish-layer-version --layer-name audio-layer-helper --content S3Bucket=${S3_NAME},S3Key=Layer/lib.zip --compatible-runtimes nodejs16.x --query 'LayerVersionArn' --profile pessoal --no-cli-pager --output text || true)

# Update Layers
echo 'Update Layer'
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_CREATE_NAME} --layers ${LAYER_CREATE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_READ_NAME} --layers ${LAYER_READ} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_UPDATE_NAME} --layers ${LAYER_UPDATE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true
aws lambda update-function-configuration --function-name ${LAMBDA_FUNCTION_DELETE_NAME} --layers ${LAYER_DELETE} ${LAYER_HELPER} --profile pessoal --no-cli-pager || true

# Clear
echo 'Clear'
sh ./clearAllDep.sh
