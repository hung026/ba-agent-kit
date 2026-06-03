# BPMN 2.0 Elements — XML Reference

## Start Event (thường)
```xml
<startEvent id="Start_1" name="Bắt đầu">
  <outgoing>SF_1</outgoing>
</startEvent>
```

## Start Event (Message — được trigger bởi tin nhắn từ pool khác)
```xml
<startEvent id="Start_1" name="Nhận yêu cầu">
  <outgoing>SF_1</outgoing>
  <messageEventDefinition id="MED_1"/>
</startEvent>
```

## End Event
```xml
<endEvent id="End_1" name="Kết thúc">
  <incoming>SF_N</incoming>
</endEvent>
```

## Task
```xml
<task id="Task_1" name="Tên công việc">
  <incoming>SF_1</incoming>
  <outgoing>SF_2</outgoing>
</task>
```

## Intermediate Catch Event (chờ nhận tin từ pool khác)
```xml
<intermediateCatchEvent id="ICE_1" name="Nhận phản hồi">
  <incoming>SF_1</incoming>
  <outgoing>SF_2</outgoing>
  <messageEventDefinition id="MED_2"/>
</intermediateCatchEvent>
```

## Exclusive Gateway — XOR (if/else, chỉ 1 nhánh được chọn)
```xml
<exclusiveGateway id="GW_1" name="Điều kiện?">
  <incoming>SF_1</incoming>
  <outgoing>SF_2</outgoing>
  <outgoing>SF_3</outgoing>
</exclusiveGateway>
```

Sequence flows từ XOR nên có `name` để label nhánh:
```xml
<sequenceFlow id="SF_2" name="Có" sourceRef="GW_1" targetRef="Task_2"/>
<sequenceFlow id="SF_3" name="Không" sourceRef="GW_1" targetRef="Task_3"/>
```

## Parallel Gateway — AND Split (làm song song)
```xml
<parallelGateway id="GW_2" name="">
  <incoming>SF_1</incoming>
  <outgoing>SF_2</outgoing>
  <outgoing>SF_3</outgoing>
</parallelGateway>
```

## Parallel Gateway — AND Join (chờ tất cả nhánh xong)
```xml
<parallelGateway id="GW_3" name="">
  <incoming>SF_2</incoming>
  <incoming>SF_3</incoming>
  <outgoing>SF_4</outgoing>
</parallelGateway>
```

## Sequence Flow
```xml
<sequenceFlow id="SF_1" sourceRef="Start_1" targetRef="Task_1"/>
```

## Collaboration + Participants (khi có nhiều pools)
```xml
<collaboration id="Collab_1">
  <participant id="Pool_A" name="Tên Pool A" processRef="Proc_A"/>
  <participant id="Pool_B" name="Tên Pool B" processRef="Proc_B"/>
  <messageFlow id="MF_1" name="Tên tin nhắn" sourceRef="Task_X" targetRef="Start_B"/>
  <messageFlow id="MF_2" name="Phản hồi" sourceRef="Task_Y" targetRef="ICE_1"/>
</collaboration>
```

## Lane (sub-department bên trong 1 pool)
```xml
<process id="Proc_A" isExecutable="false">
  <laneSet id="LS_1">
    <lane id="Lane_1" name="Phòng Kỹ thuật">
      <flowNodeRef>Start_1</flowNodeRef>
      <flowNodeRef>Task_1</flowNodeRef>
    </lane>
    <lane id="Lane_2" name="Phòng Kinh doanh">
      <flowNodeRef>Task_2</flowNodeRef>
      <flowNodeRef>End_1</flowNodeRef>
    </lane>
  </laneSet>
  <!-- Khai báo tasks như bình thường bên dưới -->
  <startEvent id="Start_1" .../>
  <task id="Task_1" .../>
  ...
</process>
```

---

## Naming conventions (ID)

| Element | Pattern ID |
|---|---|
| Pool | `Pool_[TenNgan]` |
| Process | `Proc_[TenNgan]` |
| Start Event | `Start_[Pool]` |
| End Event | `End_[Pool]` |
| Task | `Task_[TenNgan]` |
| Gateway | `GW_[so]` |
| Intermediate Catch | `ICE_[so]` |
| Sequence Flow | `SF_[so]` |
| Message Flow | `MF_[so]` |
| Message Event Def | `MED_[so]` |
| Lane | `Lane_[TenNgan]` |
