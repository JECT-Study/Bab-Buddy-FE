import type { SurveyOption } from '../types/foodSurveyTypes'

// 1단계: 맛 관련 옵션
const STEP_1_OPTIONS: SurveyOption[] = [
	{
		id: 'fresh',
		label: '기름기 없는',
		sublabel: '담백한 맛',
		icon: 'taste_plain',
	},
	{
		id: 'spicy',
		label: '입안 얼얼한',
		sublabel: '스트레스 해소',
		icon: 'taste_spicy',
	},
	{
		id: 'null',
		label: '',
		sublabel: '',
		icon: 'taste_plain', // 빈 카드용 임시 아이콘
	},
	{
		id: 'comfort',
		label: '속 편한',
		sublabel: '감싸는 한끼',
		icon: 'taste_mild',
	},
	{
		id: 'homestyle',
		label: '매일 먹어도',
		sublabel: '안질리는 집밥',
		icon: 'taste_staple',
	},
	{
		id: 'unique',
		label: '특이하고',
		sublabel: '신기한 맛',
		icon: 'taste_unique',
	},
]

// 2단계: 음식 종류 옵션
const STEP_2_OPTIONS: SurveyOption[] = [
	{
		id: 'korean',
		label: '집 근처 정겨운 ',
		sublabel: '한식당',
		icon: 'restaurant_korean',
	},
	{
		id: 'chinese',
		label: '중국 골목의',
		sublabel: '중화요리집',
		icon: 'restaurant_chinese',
	},
	{
		id: 'null',
		label: '',
		sublabel: '',
		icon: 'restaurant_korean', // 빈 카드용 임시 아이콘
	},
	{
		id: 'japanese',
		label: '깔끔하고 정갈한',
		sublabel: '일식집',
		icon: 'restaurant_japanese',
	},
	{
		id: 'italian',
		label: '파스타와 피자의',
		sublabel: '이탈리안 식당',
		icon: 'restaurant_italian',
	},
	{
		id: 'global',
		label: '국적 불문',
		sublabel: '맛있으면 장땡',
		icon: 'restaurant_global',
	},
]

// 3단계: 음식 타입 옵션
const STEP_3_OPTIONS: SurveyOption[] = [
	{
		id: 'greasy',
		label: '기름진 음식',
		sublabel: '',
		icon: 'food_greasy',
	},
	{
		id: 'soupy',
		label: '국물 있는 음식',
		sublabel: '',
		icon: 'food_soupy',
	},
	{
		id: 'salty',
		label: '짠 음식',
		sublabel: '',
		icon: 'food_salty',
	},
	{
		id: 'fish',
		label: '생선류',
		sublabel: '',
		icon: 'food_fish',
	},
	{
		id: 'heavy',
		label: '너무 무거운 음식',
		sublabel: '',
		icon: 'food_heavy',
	},
	{
		id: 'none',
		label: '없음',
		sublabel: '',
		icon: 'food_none',
	},
]

// 각 단계별 설정
const SURVEY_CONFIG = {
	'1': {
		beforeText: '음식을 추천하기 위한 ',
		highlightText: '첫번째 질문',
		afterText: '이에요!',
		subtitle: '지금 가장 떠오르는 맛은 무엇인가요?',
		backgroundImage: '/assets/images/personalsurvey_survey1_babbuddy.webp',
		options: STEP_1_OPTIONS,
	},
	'2': {
		beforeText: '좋아요! 다음은 ',
		highlightText: '두번째 질문',
		afterText: '이에요!',
		subtitle: '상상 여행을 떠난다면 오늘은 어디가 끌리나요?',
		backgroundImage: '/assets/images/personalsurvey_survey2.webp',
		options: STEP_2_OPTIONS,
	},
	'3': {
		beforeText: '이제는 ',
		highlightText: '마지막 질문',
		afterText: '이에요!',
		subtitle: '특별히 피하고 싶은 건 있나요?',
		backgroundImage: '/assets/images/persoanlsurvey_survey3.webp',
		options: STEP_3_OPTIONS,
	},
}

export { STEP_1_OPTIONS, STEP_2_OPTIONS, STEP_3_OPTIONS, SURVEY_CONFIG }
