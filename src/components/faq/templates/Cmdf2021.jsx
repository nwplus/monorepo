import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  SectionContainerWithBackground as SectionContainerWithContainBackground,
  Columns,
  Column,
} from '@lib/Containers'
import ExpandableFaqList from '@components/faq/lib/FaqList'
import backgroundPlants from '@assets/faq__background_plants.svg'
import titleOptions from '@assets/faq__title_options.svg'
import questionLeftDecor from '@assets/faq__question_leftdecor.svg'
import questionRightDecor from '@assets/faq__question_rightdecor.svg'
import headsetDecor from '@assets/faq__decor_general.svg'
import ducksDecor from '@assets/faq__decor_teams.svg'
import laptopDecor from '@assets/faq__decor_logistics.svg'
import mLaptopDecor from '@assets/faq__decor_logistics_m.svg'
import faqTitle from '@assets/faq__title.svg'
import { TABLET } from '@constants/measurements'
import { scale } from '@utilities/format'
import fireDb from '@utilities/firebase'

const TitleImg = styled.img`
  margin-bottom: ${p => p.marginBottom};
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10vw;
  @media only screen and (max-width: ${TABLET}) {
    width: 20vw;
  }
`

const AdjustmentContainer = styled.div`
  position: relative;
  z-index: 0;
  margin: ${p => p.shift};
  background-color: #efedea;
  border: ${() => scale(320, 1440, 3, 5)} solid #4a5759;
  border-radius: ${() => scale(320, 1440, 5, 8)};
  @media only screen and (max-width: ${TABLET}) {
    width: 80%;
    padding: 0;
    margin: 10vh auto 0 auto;
  }
`

const FaqTitle = styled.div`
  position: relative;
  z-index: 1;
  color: #192825;
  padding: 0.5vh 0 0.5vh 0;
  font-weight: 700;
  font-size: ${() => scale(320, 1440, 17, 19)};
  line-height: 21px;
  text-align: center;
  border-bottom: ${() => scale(320, 1440, 4, 5)} solid #4a5759;
  background-color: #c8bfb6;
`

const FaqTitleBackground = styled.img`
  position: absolute;
  z-index: -1;
  top: 8px;
  right: 1vw;
`

const Decor = styled.img`
  position: absolute;
  z-index: 2;
`
const GeneralBoxDecor = styled(Decor)`
  top: -8px;
  left: 33.5vw;
  @media only screen and (max-width: ${TABLET}) {
    left: 70vw;
    width: 18vw;
  }
`
const LogisticsBoxDecor = styled(Decor)`
  position: absolute;
  left: 20px;
  bottom: 98%;
  width: 70%;
  @media only screen and (max-width: ${TABLET}) {
    bottom: 99%;
    height: 90%;
    visibility: hidden;
  }
`
const MobileLogisticsBoxDecor = styled(LogisticsBoxDecor)`
  visibility: hidden;
  @media only screen and (max-width: ${TABLET}) {
    bottom: 100%;
    left: 35vw;
    height: 13vh;
    width: auto;
    visibility: visible;
  }
`

const TeamsProjectBoxDecor = styled(Decor)`
  left: 20px;
  bottom: 100%;
  width: 90%;
`

const SectionContainerWithBackground = styled(SectionContainerWithContainBackground)`
  background-size: cover;
`
// FAQ Section with two columns and scattered layout:
// General    Logistics
//          Teams & Projects
const ExpandableScatteredCategories = ({ config }) => {
  const [categorizedFaqMap, setFaqMap] = useState(new Map())
  const [faq, setFaq] = useState([])

  const categorizeFaq = faqList => {
    const updatedMap = new Map()
    faqList.forEach(({ category, question, answer }) => {
      const reducedFaq = { question, answer }

      const currFaqList = updatedMap.get(category)
      const updatedFaqList = currFaqList ? [reducedFaq, ...currFaqList] : [reducedFaq]

      updatedMap.set(category, updatedFaqList)
      setFaqMap(updatedMap)
    })
  }

  useEffect(() => fireDb.subscribeToCollection('cmd-f2021', 'FAQ', setFaq), [])

  useEffect(() => {
    categorizeFaq(faq)
  }, [faq])

  return (
    <SectionContainerWithBackground
      width={config.containerWidth}
      margin={config.containerMargin}
      padding="10% 0 10% 0"
      src={backgroundPlants}
      id="faq"
    >
      <TitleImg src={faqTitle} alt={config.titleAlt} marginBottom={config.marginBottomTitle} />
      <Columns>
        <Column>
          <AdjustmentContainer shift="2vh 4vw 0 4vw">
            <GeneralBoxDecor src={headsetDecor} />
            <FaqTitle>
              general.faq
              <FaqTitleBackground src={titleOptions} />
            </FaqTitle>
            <ExpandableFaqList
              list={categorizedFaqMap.get('General')}
              decor={{ leftDecor: questionLeftDecor, rightDecor: questionRightDecor }}
            />
          </AdjustmentContainer>
        </Column>
        <Column>
          <AdjustmentContainer shift="0 3vw 0 5vw">
            <TeamsProjectBoxDecor src={ducksDecor} />
            <FaqTitle>
              teams&amp;projects.faq
              <FaqTitleBackground src={titleOptions} />
            </FaqTitle>
            <ExpandableFaqList
              list={categorizedFaqMap.get('Teams & Projects')}
              decor={{ leftDecor: questionLeftDecor, rightDecor: questionRightDecor }}
            />
          </AdjustmentContainer>
          <AdjustmentContainer shift="20vh 8vw 0 -5vw">
            <LogisticsBoxDecor src={laptopDecor} />
            <MobileLogisticsBoxDecor src={mLaptopDecor} />
            <FaqTitle>
              logistics.faq
              <FaqTitleBackground src={titleOptions} />
            </FaqTitle>
            <ExpandableFaqList
              list={categorizedFaqMap.get('Logistics')}
              decor={{ leftDecor: questionLeftDecor, rightDecor: questionRightDecor }}
            />
          </AdjustmentContainer>
        </Column>
      </Columns>
    </SectionContainerWithBackground>
  )
}

export default ExpandableScatteredCategories
