import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import EtkinlikListesi from "./EtkinlikListesi";
import { LoadingIndicator } from "../../../app/layout/LoadingIndicator";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import EtkinlikFiltrele from "./EtkinlikFiltrele";

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

  if (yukleniyorInit && sayfa === 0)
    return <LoadingIndicator content="Etkinlikler yükleniyor..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && sayfa + 1 < toplamSayfa}
          initialLoad={false}
        >
          <EtkinlikListesi />
        </InfiniteScroll>
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
