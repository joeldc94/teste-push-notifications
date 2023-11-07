const webPush = require('web-push')
const express = require('express')

const router = express.Router()
//console.log(webPush.generateVAPIDKeys()) //gera as chaves VAPID publica e privada

const publicKey = 'BOo4JdL-EHH0zy65zyd5gHmN6kf-DLS598Tt-eSXhCafjuxFnhs0vEJFZcWrpabOcImeZLmXaLRmBtni8oht6Fg'
const privateKey = 'o-in31Sch4MhBBNGMtfJ9NPg9eiU0E4eWBhAbjHdW2U'

webPush.setVapidDetails('mailto:joel@previsio.com.br', publicKey, privateKey)

router.get('/public_key', (req, res) => {
    return res.status(201).json({ publicKey });
    //return { publicKey }
})


router.post('/register', (req, res) => {
    console.log("body", req.body);

    // criar DB relacionando a subscription recebida com a ID do usuário


    return res.status(201).send()
})

router.post('/send', async (req, res) => {
    const { subscription } = req.body;

    webPush.sendNotification(subscription, 'Notificação vinda do backend')
/* 
    setTimeout(()=>{
        webPush.sendNotification(subscription, 'Notificação vinda do backend')
    }, 5000)
 */
    return res.status(201).send()
})

module.exports = router