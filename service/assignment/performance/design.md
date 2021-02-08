# Subscriber :
1. Worker :
    - worker.registration.success
    - worker.registration.failed
    - worker.remove.success
    - worker.remove.failed
    - worker.show.failed
1. Task :
    - task.add.success
    - task.add.failed
    - task.update.success
    - task.update.failed
    - task.show.failed
# Publisher :
1. Worker :
    - total of worker
1. Task :
    - total of task (with filter -semua, selesai, batal-)

# KV :
1. key: worker.add.log<br>
    value: [{timestamp: status}]
1. key: worker.remove.log<br>
    value: [{timestamp: status}]
1. key: worker.show.log (only failed log)<br>
    value: [{timestamp}]
1. key: task.add.log<br>
    value: [{timestamp: status}]
1. key: task.remove.log<br>
    value: [{timestamp: status}]
1. key: task.show.log (only failed log)<br>
    value: [{timestamp}]
1. key: tasks<br>
    value: [{job, workerId, status, documentName}]
1. key: workers<br>
    value: [{workerName, workerId, photoName, ....Identity}]
