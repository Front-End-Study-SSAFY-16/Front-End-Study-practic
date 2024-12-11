# Front-End study 실습 기록
- 프론트엔드 스터디를 하며 진행할 실습 내용을 기록하는 저장소

# 👨🏻‍💻 멤버
|[![](https://github.com/pcjo1202.png?width=150px)](https://github.com/pcjo1202)|[![](https://github.com/beak1sin.png?width=150px)](https://github.com/beak1sin) |[![](https://github.com/jinlaove17.png?width=150px)](https://github.com/jinlaove17) |[![](https://github.com/raonrabbit.png?width=150px)](https://github.com/raonrabbit)|[![](https://github.com/Seoheeda.png?width=150px)](https://github.com/Seoheeda)
|:---:|:---:|:---:|:---:|:---:|
| 박창조 | 이재백 | 전종우 | 최준혁 | 윤서희 |

# 🌟 실습 내용
|주차|주제| 기간 |
|:---:|:---:|:---:|
| 1 | [TodoList](/TodoList) | 24.09.23 ~ 10.04 |
| 2~3 | [AirBnB Clone (HTML & CSS 위주)](/AirBnB) | 24.10.05 ~ 10.18 |
| 4~5 | [AirBnB Clone (비동기&무한스크롤 구현)](/AirBnB) | 24.10.19 ~ 10.30 |
| 6~9 | SSAFY Final 관통 프로젝트 주간 | 24.11.04 ~ 11.28 |
| 10~ | SSAFY Final 관통 프로젝트 리팩토링(+ Vue3->React) | 24.12.11 ~ |

# ✅ 파일 이름 규칙
```markdown
실습 주제/
  ├─ 이름/
  │   ├─ Vanilla/
  │   └─ React/   
```

# ✅ 저장소 관리
## Branch
```Markdown

브랜치명 => 실습이름/이름
```

```bash
// 예시
git branch TodoList/creation
git checkout TodoList/creation

```

## commit

```Markdown
[이름][0주차] 내용

```

```bash
// 예시
git commit -m "[홍길동][0주차] 어쩌구 실습"
```

## PR

```Markdown
1. 작업 중인 브랜치를 remote (github) 에 올린다. 

`git push origin {브랜치명}`

2. github에서 pull requests를 생성한다.
  - `New Pull request` 선택
  - base : main, compare: {작업한 브랜치명}
  - 내용 작성 후 요청

3. PR 확인 후 Merge
```
