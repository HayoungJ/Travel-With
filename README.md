# 간단한 여행 계획을 짤 수 있는 웹사이트
1. 입력한 여행지에 맞는 지도를 띄워줍니다.
2. 여행 계획을 추가할 수 있습니다.
3. 사용한 경비를 추가할 수 있습니다.
4. 친구에게 링크를 통해 공유 및 함께 수정 가능합니다.

## 프로젝트 목표
내 힘으로 하나의 사이트를 완성시켜 보는 것

## 프로젝트 배포 링크
<a href="https://travel-with-53a9e.web.app/" target="_blank">https://travel-with-53a9e.web.app/</a> <br/>
테스트 가능한 아이디 : test@test.com / helloworld <br/>
예시 링크 : https://travel-with-53a9e.web.app/travel/1658748510969 <br/>

## 프로젝트 기본 기능

### 회원가입 + 로그인
<img width="1438" alt="image" src="https://user-images.githubusercontent.com/59152882/180773256-0ac7e156-2233-472f-838b-87e3b50eb671.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59152882/180773161-75a2b7b8-9f6b-4800-954c-7f5b0a82385a.png">

> 이메일과 비밀번호를 이용해 회원가입 후 로그인 하거나, 구글 계정을 이용해 로그인 할 수 있습니다.
> 여행 계획을 새로 추가하거나, 기존 계획을 수정하기 위해서는 로그인이 필요하지만, 이미 작성된 계획을 열람만 하는 데에는 로그인이 필요하지 않습니다.

> 이메일과 비밀번호를 이용해 직접 회원가입을 하는 경우에는 이름, 이메일, 비밀번호를 모두 입력해야 회원가입 버튼이 활성화 됩니다.

> 회원가입은 firebase authentication을 이용해 기능을 구현하였습니다.

### 로그인 후 선택 화면
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59152882/180773431-819020da-99f7-45f5-9d97-61fe35bf3dfa.png">

> 로그인에 성공하면, 1. 새로운 여행 계획 추가 2. 기존 여행 계획 중 선택하여 확인 3. 링크로 공유받은 여행 계획 확인 중 선택할 수 있는 화면으로 이동됩니다.

#### 새 여행 계획 만들기
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/59152882/180773512-8e376c33-a931-49fc-865e-a1a814503143.png">
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/59152882/180773579-d294fc3d-4c8d-4628-98b7-b32e0606f393.png">

> 여행 이름, 여행 장소, 여행 날짜를 선택하여 새 여행 계획을 생성할 수 있습니다.
> 여행 날짜의 경우 date-picker library를 이용하여 달력을 표시하고 선택할 수 있도록 구현했습니다.

#### 기존 여행 중 선택
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/59152882/180773709-e3289da5-1e8e-4623-8662-77d1f411b338.png">

> 기존에 생성 혹은 참여 중인 여행 계획 리스트를 보여줍니다. 선택 시 해당하는 여행 계획 페이지로 이동됩니다.

#### 공유받은 여행에 참여
<img width="1438" alt="image" src="https://user-images.githubusercontent.com/59152882/180773773-8e851894-8416-4654-91b2-b04499b1482c.png">

> 링크로 공유받은 여행 계획에 참여할 수 있습니다.
> 여행 아이디의 경우 13자리로 항상 고정이기 때문에, 입력받은 링크에서 뒤의 13자리를 읽은 후, 해당하는 값과 일치하는 여행 아이디가 존재하는지 확인하도록 구현했습니다.
> 일치하는 여행 아이디가 존재할 경우 해당 여행 계획 페이지로 이동됩니다.

### 여행 계획 확인
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/59152882/180774513-901897b4-de43-41f6-8e14-7ab301184d6a.png">

> 좌측에는 지도가, 우측에는 계획/경비/설정을 확인할 수 있는 화면이 위치하도록 구현했습니다.
> 모든 데이터는 로그인 중이고, 해당 여행 계획의 수정 권한이 있는 사람만 추가/수정할 수 있도록 구현했습니다.
> 지도 위에는 여행 계획 생성 시 입력했던 정보들이 표시됩니다. kakao map api를 이용해 지도를 보여주도록 했고, '위치' 란에 입력한 주소에 따라 좌표를 새로 검색해 화면에 표시하도록 했습니다.

#### 계획
![image](https://user-images.githubusercontent.com/59152882/180774370-c1da0773-7934-4f74-be7d-e94db038f3f4.png)
![image](https://user-images.githubusercontent.com/59152882/180774406-48b73d2c-46de-47b9-9146-8c46370f4610.png)

> 계획은 제목, 위치, 설명을 입력할 수 있습니다.
> 위치에 특정 위치 입력 시 지도 위에 관련 마커들이 생성되고, 마커를 선택하면 장소 이름과 주소가 표시됩니다.
> 기존에 추가해둔 계획들은 리스트로 표시되고, 우측의 깃발 모양 버튼을 눌러 지도에 표시할 수 있습니다.

#### 경비
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/59152882/180774265-5242fac8-e859-4e04-a0a6-5f6fe4dcbad6.png">

> 경비는 여행에서 사용한 경비를 기록할 수 있습니다.
> 장소, 날짜, 분류, 금액을 입력할 수 있고, 입력된 금액은 상단의 '총 사용 금액'에 반영됩니다. 인원 수를 입력하면 인당 사용 금액도 계산할 수 있습니다.

#### 설정
![image](https://user-images.githubusercontent.com/59152882/180774068-823f5f71-e73d-4cca-b60f-5734f6dbeb23.png)
![image](https://user-images.githubusercontent.com/59152882/180774114-459e1f2e-4f87-4437-8519-8c6825ff8ec2.png)


> 설정 란에서는 공유 링크 복사, 현재 여행 계획에 참여 중인 사람을 확인할 수 있습니다.
> 공유하기 란의 링크를 클릭해 복사 가능합니다.
> 참여자 관리의 이름 옆 x를 클릭해 해당 계획을 더이상 수정하지 못 하도록 권한을 제외할 수 있습니다.
> 계획을 만든 소유자의 경우 해당 계획을 삭제할 수 있습니다.
> 계획에 참여 중인 참여자의 경우 해당 계획에 더이상 참여하지 않기를 선택할 수 있습니다.
