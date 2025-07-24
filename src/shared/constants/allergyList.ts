// 기본 알레르기 목록 상수
export const DEFAULT_ALLERGY_LIST = [
	{ label: '견과류', description: '땅콩, 아몬드, 호두 등' },
	{ label: '해산물', description: '새우, 게, 조개류 등' },
	{ label: '유제품', description: '우유, 치즈, 버터 등' },
	{ label: '계란', description: '달걀 및 달걀 제품' },
	{ label: '글루텐', description: '밀, 보리, 호밀 등' },
	{ label: '콩', description: '대두 및 콩 제품' },
	{ label: '생선', description: '모든 종류의 생선' },
	{ label: '조개류', description: '굴, 홍합, 전복 등' },
	{ label: '참깨', description: '참깨 및 참기름' },
	{ label: '아황산염', description: '와인, 건과일 등의 방부제' },
	{ label: 'MSG', description: '글루탐산나트륨' },
	{ label: '인공색소', description: '타르색소 등' },
] as const

// 타입 정의
export interface AllergyItem {
	id: string
	name: string
	description: string
	checked: boolean
}
