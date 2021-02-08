# Subscriber :
1. Worker :
    - worker registration -> success
    - worker registration -> failed
    - worker remove -> success
    - worker remove -> failed
    - worker show -> failed
1. Task :
    - task add -> success
    - task add -> failed
    - task update -> success
    - task update -> failed
    - task show -> failed
# Reply of Subscriber : (Publisher)
1. Worker :
    - total of worker
1. Task :
    - total of task (with filter -semua, selesai, batal-)

# KV :
1. key: workerLog.add<br>
    value: [{timestamp, status}]
1. key: workerLog.remove<br>
    value: [{timestamp, status}]
1. key: workerLog.show (only failed log)<br>
    value: [{timestamp}]
1. key: taskLog.add<br>
    value: [{timestamp, status}]
1. key: taskLog.remove<br>
    value: [{timestamp, status}]
1. key: taskLog.show (only failed log)<br>
    value: [{timestamp}]
1. key: worker<br>
    value: count
1. key: task<br>
    value: [{status}]
