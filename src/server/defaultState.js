import md5 from 'md5';
export const defaultState = {
    users:[{
        id:"User1",
        name:"Dev",
        passwordHash:md5("FLOWER"),
        friends:[`U2`]
    },{
        id:"User2",
        name:"Customer",
        passwordHash:md5("POWER"),
        friends:[]
    }],
    
    groups:[{
        name:"To Do",
        id:"Group1",
        owner:"User1"
    },{
        name:"In Progress",
        id:"Group2",
        owner:"User1"
    },{
        name:"Done",
        id:"Group3",
        owner:"User1"
    }],

    tasks:[{
        name:"Finish Capstone",
        id:"Task1",
        group:"Group1",
        owner:"User1",
        isComplete:false
    },{
        name:"Study SIE Exam",
        id:"Task2",
        group:"Group1",
        isComplete:true
    },{
        name:"Learn React/Redux",
        id:"Task3",
        group:"Group2",
        owner:"User2",
        isComplete:false
    },{
        name:"Do Math HW",
        id:"Task4",
        group:"Group2",
        owner:"User1",
        isComplete:true
    },{
        name:"DefaultTask",
        id:"Task5",
        group:"Group3",
        owner:"User1",
        isComplete:false
    }],

    comments:[{
        owner:"User1",
        id:"Comment1",
        task:"Task1",
        content:"Finished!"
    }]
}