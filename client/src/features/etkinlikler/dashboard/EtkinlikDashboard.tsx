import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikListesi from "./EtkinlikListesi";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import EtkinlikFiltrele from "./EtkinlikFiltrele";
import EtkinlikListesiItemPlaceholder from "./EtkinlikListesiItemPlaceholder";

const EtkinlikDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    etkinlikleriYukle,
    yukleniyorInit,
    setSayfa,
    sayfa,
    toplamSayfa
  } = rootStore.etkinlikStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setSayfa(sayfa + 1);
    etkinlikleriYukle().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    etkinlikleriYukle();
  }, [etkinlikleriYukle]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {yukleniyorInit && sayfa === 0 ? (
          <EtkinlikListesiItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && sayfa + 1 < toplamSayfa}
            initialLoad={false}
          >
            <EtkinlikListesi />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <EtkinlikFiltrele />
      </Grid.Column>
      <Grid.Column width={6}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(EtkinlikDashboard);
