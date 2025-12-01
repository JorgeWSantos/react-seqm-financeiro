import {
  ContentMobile,
  HeaderMobileNavigator,
  ShareOptions,
  TableWithLoader,
  TabsCardsBar,
} from '@abqm-ds/react';
import { ContainerMobileMain, RemoveScrollableMobile, TitleAndCards } from './styles';
import type { Tab } from '../types';
import { InfoCardsGroup } from '../InfoCards';
import { ContentTabs } from '../styles';

interface MobileInscriptionAndStallsProps {
  handleOnGoBack: () => void;
  setSearchValue: (value: string) => void;
  activeTab: string;
  tabsToShow: Tab[];
  setActiveTab: (tab: Tab['type']) => void;
  tableData: Array<any>;
  tableColumns: Array<any>;
  isLoading: boolean;
  isTabletOrMobile: boolean;
  showShareOptions: boolean;
  shareUrl: string;
}

const MobileInscriptionAndStalls = ({
  handleOnGoBack,
  setSearchValue,
  activeTab,
  tabsToShow,
  setActiveTab,
  tableData,
  tableColumns,
  isLoading,
  isTabletOrMobile,
  showShareOptions,
  shareUrl,
}: MobileInscriptionAndStallsProps) => {
  return (
    <ContainerMobileMain>
      <ContentMobile
        style={{
          maxWidth: '100vw',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0',
        }}
        contentMobileBoxStyles={{
          gap: '0.5rem',
          padding: '1.5rem 0rem 0rem 0rem',
        }}
        headerMobileNavigator={
          <HeaderMobileNavigator
            hasBackButton
            onGoBack={handleOnGoBack}
            headingText={'headingtext'}
            hasSearch
            onChangeSearch={(v) => setSearchValue(v.target.value)}
          />
        }
      >
        <TitleAndCards>
          <TabsCardsBar
            activeTab={activeTab}
            onTabChange={(tab: string) => {
              setActiveTab(tab as Tab['type']);
            }}
            tabs={
              tabsToShow.length === 0
                ? []
                : tabsToShow.map((tab) => ({
                    label: tab.type,
                    value: tab.type,
                  }))
            }
            // hideAutoWidthElement
          >
            <ContentTabs>
              <InfoCardsGroup
                qtde_inscriptions="0"
                qtde_competitors="0"
                qtde_animals="0"
                premiation_value={null}
                dt_prove={null}
              />
            </ContentTabs>
          </TabsCardsBar>
        </TitleAndCards>

        <RemoveScrollableMobile>
          <TableWithLoader
            data={tableData}
            columns={tableColumns}
            isLoading={isLoading}
          />
        </RemoveScrollableMobile>
      </ContentMobile>

      {showShareOptions && !isTabletOrMobile && <ShareOptions url={shareUrl} />}
    </ContainerMobileMain>
  );
};

export { MobileInscriptionAndStalls };
