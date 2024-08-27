const Nodes = [
    {
        "width": 276,
        "height": 67,
        "id": "firstWelcome",
        "position": {
            "x": 667.3128834697434,
            "y": 0
        },
        "type": "userMessageNode",
        "data": {
            "nodeType": "both",
            "isConnectable": true,
            "label": "Mensagem de boas vindas!",
            "action": {
                "action": "sendMessage",
                "actionName": "welcomeMessage",
                "params": [
                    {
                        "msg": "Olá! Somos da equipe de Suporte da WTT."
                    }
                ]
            },
            "links": [

            ]
        },
        "positionAbsolute": {
            "x": 667.3128834697434,
            "y": 0
        }
    },
    {
        "width": 100,
        "height": 100,
        "id": "checkUserExist",
        "position": {
            "x": 692.3128834697434,
            "y": 120.81082643112529
        },
        "data": {
            "nodeType": "both",
            "isConnectable": true,
            "label": "Usuario existe?",
            "action": {
                "action": "checkUserExist",
                "actionName": "checkUserExist",
                "params": []
            },
            "links": [

            ]
        },
        "type": "decisionNode",
        "positionAbsolute": {
            "x": 692.3128834697434,
            "y": 120.81082643112529
        }
    },
    {
        "width": 276,
        "height": 67,
        "id": "messageTest",
        "position": {
            "x": 667.3128834697434,
            "y": 300
        },
        "type": "userMessageNode",
        "data": {
            "nodeType": "both",
            "isConnectable": true,
            "label": "Mensagem teste",
            "action": {
                "action": "sendMessage",
                "actionName": "welcomeMessage",
                "params": [
                    {
                        "msg": "Mensagem teste"
                    }
                ]
            },
            "links": [

            ]
        },
        "positionAbsolute": {
            "x": 667.3128834697434,
            "y": 300
        }
    }
];

export default Nodes;