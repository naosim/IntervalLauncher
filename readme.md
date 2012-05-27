特徴：
このアプリは、指定したアプリ(.exeとか.batとか)を
定期的に実行することが出来ます。

CI環境を構築して定期的に何かを実行したいけど
jenkinsサーバたてるのは面倒。クーロンにするのも面倒。
って人に使ってもらいたいと思います。

たぶん、独り開発の場合、
定期的に特定のアプリを実行してくれるランチャーがあれば、
CI環境としては十分なんじゃね？って思ったわけです。

Adobe AIR 開発メモ

##SDKにパスを通す。
export PATH=$PATH:/Applications/AdobeAIRSDK/bin

##実行する
adl IntervalLauncher-app.xml

##リリース方法
自己署名入り証明書とキーのペアの生成
adt -certificate -cn SelfSigned 1024-RSA sampleCert.pfx samplePassword

AIR インストールファイルの作成
adt -package -storetype pkcs12 -keystore sampleCert.pfx IntervalLauncher.air IntervalLauncher-app.xml src

→IntervalLauncher.airを公開

##バックログ的な何か。
* ランチャーの基本動作 (パスを指定して、ボタンを押すと、アプリを起動できる)
* トリガは手動だけどCIが出来る (アプリを５つ登録できる)
* UIがいい感じ (BootstrapのUIにする)
* chromeだけでもある程度テストできるようにする(リファクタ)
* 次の日もパスを入れ直さなくてOK (保存ボタンを押すと、パスの状態を保存できる)
* CI環境完成 (定期的に実行できる)
* アプリ登録が簡単にできる (アプリをD&Dで登録できる)

==今ここ==

* 複数プロジェクトで切り替えれる (設定状態をImport, Exportできる)