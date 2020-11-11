export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: 'us-east-1',
        BUCKET: 'notes-app-uploads-12433'
    },
    apiGateway: {
        REGION: 'us-east-1',
        URL: 'https://eqo4dttiui.execute-api.us-east-1.amazonaws.com/'
    },
    cognito: {
        REGION: 'us-east-1',
        USER_POOL_ID: 'us-east-1_kg3OeOU6Z',
        APP_CLIENT_ID: '26naf630632a4nmpsc6umhp3nn',
        IDENTITY_POOL_ID: 'us-east-1:9003e189-6a41-4c75-af6b-eb8c76fbeb83'
    },
    STRIPE_KEY:'pk_test_FbHiQfWE0UneLjB8iqofuAiE'
}