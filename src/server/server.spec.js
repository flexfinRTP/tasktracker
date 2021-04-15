import { addNewTask, updateTask } from './communicate'

(async function(){ //route that adds the new task to the server
    await addNewTask({
        name:"Spec task",
        isComplete:true,
        id:"TEST-1"});
    console.info("Added task");

    await updateTask({ //route that updates the task to the server
        name:"Spec Task (UPDATED)",
        id:"TEST-1",
        isComplete:false});

    console.info("Task updated");
})();