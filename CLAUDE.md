# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FENa/FEUrea 계산기 - 급성신손상(AKI) 감별진단을 위한 모바일 웹 애플리케이션.
한국어 전용, Netlify 배포 대상.

## Tech Stack

순수 HTML + CSS + JavaScript (빌드 과정 없음)

## Development

로컬 테스트: `index.html`을 브라우저에서 직접 열기

배포: Netlify 드래그 & 드롭 또는 Git 연동

## Architecture

```
index.html  - UI 구조, 입력 폼, 결과 표시 영역
style.css   - CSS 변수 기반 스타일, 모바일 반응형, 다크모드 지원
script.js   - 계산 로직, DOM 조작, 이벤트 처리
```

### 계산 공식

- **FENa (%)** = (UNa × PCr) / (PNa × UCr) × 100
- **FEUrea (%)** = (UUrea × PCr) / (PUrea × UCr) × 100

### 결과 해석 기준

| 지표 | 신전성 AKI | 신실질성 AKI |
|------|-----------|-------------|
| FENa | < 1% | > 2% |
| FEUrea | < 35% | > 35% |

### 입력값 단위

- 혈청/소변 나트륨: mmol/L
- 혈청/소변 크레아티닌: mg/dL
- 혈청 BUN / 소변 요소: mg/dL

### CSS 색상 코딩

- `.prerenal` (녹색): 신전성 AKI
- `.borderline` (노란색): 경계값 (FENa 1-2%)
- `.intrinsic` (빨간색): 신실질성 AKI
