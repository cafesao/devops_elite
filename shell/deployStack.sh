# Create Export Folder Path
export ROOT_FOLDER=$(pwd)

echo 'Validate Templates...'

aws cloudformation validate-template --template-body file://../Devops/arn.yml \
    --profile pessoal \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/s3.yml \
    --profile pessoal \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/dynamodb.yml \
    --profile pessoal \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/cognito.yml \
    --profile pessoal \
    --no-cli-pager

aws cloudformation validate-template --template-body file://../Devops/lambda.yml \
    --profile pessoal \
    --no-cli-pager

echo 'Templates Valid!'

echo 'Deploy ARN...'
aws cloudformation deploy --template-file '../Devops/arn.yml' \
    --stack-name 'audio-arn' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

echo 'Deploy ARN Complete'

echo 'Deploy S3...'
aws cloudformation deploy --template-file '../Devops/s3.yml' \
    --stack-name 'audio-s3' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

echo 'Deploy S3 Complete'

echo 'Deploy DynamoDB...'
aws cloudformation deploy --template-file '../Devops/dynamodb.yml' \
    --stack-name 'audio-dynamodb' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

echo 'Deploy DynamoDB Complete'

echo 'Deploy Cognito...'
aws cloudformation deploy --template-file '../Devops/cognito.yml' \
    --stack-name 'audio-cognito' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

echo 'Deploy Cognito Complete'

echo 'Deploy Lambda...'
aws cloudformation deploy --template-file '../Devops/lambda.yml' \
    --stack-name 'audio-lambda' \
    --profile pessoal \
    --no-cli-pager \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --parameter-overrides \
    "AcmCertificate=arn:aws:acm:us-east-1:326611364316:certificate/0d6c6811-96cb-45b9-b373-8f0c26e8fb62" \
    "DomainName=cafesao.net" \
    "NameAPI=audio"
